import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import {
  ArticleCreate,
  ArticleDeleted,
  Article,
  ArticleWithHeadings,
  ArticleUpdate,
} from './articles.entity';
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
          select: { id: true, author: { select: { id: true, username: true } }, content: true },
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
          select: { id: true, author: { select: { id: true, username: true } }, content: true },
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
    });

    return article;
  }

  async updateArticle(id: string, articleUpdateData: UpdateArticleDto) {
    const findArticle = await this.getArticle({ id });
    const mediaFiles = getMeadiaFilesFromMarkdown(articleUpdateData.content);

    if (mediaFiles.length) {
      await this.deleteMediaFiles(id);
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
    });

    return article;
  }

  async deleteArticle(where: Prisma.ArticlesWhereUniqueInput) {
    const { id, mediaFiles } = await this.getArticle(where);

    if (mediaFiles.length) {
      await this.deleteMediaFiles(id);
    }

    const deletedArticle: ArticleDeleted = await this.prismaService.articles.delete({
      where: { id },
      select: { id: true },
    });

    return deletedArticle;
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
    });

    return article;
  }

  async updateLikes(id: string, like: boolean) {
    await this.getArticle({ id });

    const article: ArticleUpdate = await this.prismaService.articles.update({
      where: {
        id,
      },
      data: {
        viewCount: like
          ? {
              increment: 1,
            }
          : {
              decrement: 1,
            },
      },
    });

    return article;
  }

  async createFile(file: Express.Multer.File): Promise<string> {
    const fileName = await this.minioService.uploadFile(file);
    return this.minioService.getFileUrl(fileName);
  }

  private async deleteMediaFiles(articleId: string): Promise<void> {
    await this.prismaService.mediaFiles.deleteMany({
      where: {
        articleId,
      },
    });
  }
}
