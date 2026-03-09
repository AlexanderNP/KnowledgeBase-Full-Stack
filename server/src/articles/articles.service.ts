import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { ArticleCreate, Article, ArticleWithHeadings, ArticleUpdate } from './articles.entity';
import { MinioService } from 'src/minio/minio.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { getHeadingsFromMarkdown, getMeadiaFilesFromMarkdown } from './utils';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async getArticles(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ArticlesWhereInput;
    orderBy?: Prisma.ArticlesOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;

    const articles: Article[] = await this.prismaService.articles.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        mediaFiles: { select: { type: true, url: true } },
        categories: { select: { id: true, name: true } },
        comments: {
          select: {
            id: true,
            author: { select: { id: true, username: true } },
            content: true,
            createdAt: true,
            updateAt: true,
          },
        },
        author: {
          select: { id: true, username: true },
        },
      },
    });

    return articles;
  }

  async getArticle(articleWhereUniqueInput: Prisma.ArticlesWhereUniqueInput) {
    const findArticle: Article | null = await this.prismaService.articles.findUnique({
      where: articleWhereUniqueInput,
      include: {
        mediaFiles: { select: { type: true, url: true } },
        categories: { select: { id: true, name: true } },
        comments: {
          select: {
            id: true,
            author: { select: { id: true, username: true } },
            content: true,
            createdAt: true,
            updateAt: true,
          },
        },
        author: {
          select: { id: true, username: true },
        },
      },
    });

    if (!findArticle) {
      throw new NotFoundException(`Статья по ID ${articleWhereUniqueInput.id} не найдена`);
    }

    const headings = getHeadingsFromMarkdown(findArticle.content);

    const article: ArticleWithHeadings = { ...findArticle, headings };

    return article;
  }

  async createArticle(articleInput: CreateArticleDto) {
    const mediaFiles = getMeadiaFilesFromMarkdown(articleInput.content);

    const article: ArticleCreate = await this.prismaService.articles.create({
      data: {
        ...articleInput,
        categories: {
          connect: articleInput.categoryIds.map((id) => ({ id })),
        },
        mediaFiles: {
          create: mediaFiles,
        },
      },
      include: {
        author: {
          select: { id: true, username: true },
        },
      },
    });

    return article;
  }

  async updateArticle(id: string, articleUpdateData: UpdateArticleDto) {
    const findArticle = await this.getArticle({ id });
    const mediaFiles = getMeadiaFilesFromMarkdown(articleUpdateData.content);

    if (mediaFiles.length) {
      await this.prismaService.mediaFiles.deleteMany({
        where: { articleId: id },
      });
    }

    const data: Prisma.ArticlesUpdateInput = {
      ...articleUpdateData,
      mediaFiles: {
        create: mediaFiles,
      },
    };

    if (articleUpdateData?.categoryIds?.length) {
      data.categories = {
        disconnect: findArticle.categoryIds.map((id) => ({ id })),
        connect: articleUpdateData.categoryIds.map((id) => ({ id })),
      };
    }

    const article: ArticleUpdate = await this.prismaService.articles.update({
      where: { id },
      data,
      include: {
        author: {
          select: { id: true, username: true },
        },
      },
    });

    return article;
  }

  async deleteArticle(where: Prisma.ArticlesWhereUniqueInput) {
    const { id, mediaFiles } = await this.getArticle(where);

    const deleteComments = this.prismaService.comments.deleteMany({
      where: { articleId: id },
    });

    const deleteFavorites = this.prismaService.favoritesArticle.deleteMany({
      where: { articleId: id },
    });

    const deleteMediaFiles = this.prismaService.mediaFiles.deleteMany({
      where: { articleId: id },
    });

    const deleteArticle = this.prismaService.articles.delete({
      where: { id },
      select: { id: true },
    });

    await this.prismaService.$transaction([
      deleteComments,
      deleteFavorites,
      deleteMediaFiles,
      deleteArticle,
    ]);

    const filesToDelete = mediaFiles.map((item) => item.url);

    await this.minioService.deleteFiles(filesToDelete);
  }

  async updateViews(id: string) {
    await this.getArticle({ id });

    const article: ArticleUpdate = await this.prismaService.articles.update({
      where: {
        id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      include: {
        author: {
          select: { id: true, username: true },
        },
      },
    });

    return article;
  }

  async toggleLikes(id: string, userId: string) {
    await this.getArticle({ id });

    const findLikedArticle = await this.prismaService.articleLike.findUnique({
      where: { userId_articleId: { userId, articleId: id } },
    });

    if (findLikedArticle) {
      await this.unlike(id, userId);
      return;
    }

    await this.like(id, userId);
  }

  private async like(id: string, userId: string) {
    const createLike = this.prismaService.articleLike.create({
      data: { userId, articleId: id },
    });

    const incrementLikes = this.prismaService.articles.update({
      where: {
        id,
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    await this.prismaService.$transaction([createLike, incrementLikes]);
  }

  private async unlike(id: string, userId: string) {
    const deleteLike = this.prismaService.articleLike.delete({
      where: { userId_articleId: { userId, articleId: id } },
    });

    const decrementLikes = this.prismaService.articles.update({
      where: {
        id,
      },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    });

    await this.prismaService.$transaction([deleteLike, decrementLikes]);
  }

  async createFile(file: Express.Multer.File): Promise<string> {
    const fileName = await this.minioService.uploadFile(file);
    return this.minioService.getFileUrl(fileName);
  }
}
