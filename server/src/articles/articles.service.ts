import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { Article } from './articles.entity';
import { MinioService } from 'src/minio/minio.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { getMeadiaFilesFromMarkdown } from './utils';

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
  }): Promise<Article[]> {
    const { skip, take, where, orderBy } = params;

    return await this.prismaService.articles.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        mediaFiles: true,
        categories: true,
        comments: true,
      },
    });
  }

  async getArticle(articleWhereUniqueInput: Prisma.ArticlesWhereUniqueInput) {
    const findArticle = await this.prismaService.articles.findUnique({
      where: articleWhereUniqueInput,
      include: {
        mediaFiles: true,
        categories: true,
        comments: true,
      },
    });

    if (!findArticle) {
      throw new NotFoundException(`Статья по ID ${articleWhereUniqueInput.id} не найдена`);
    }

    return findArticle;
  }

  async createArticle(articleInput: CreateArticleDto): Promise<Article> {
    const mediaFiles = getMeadiaFilesFromMarkdown(articleInput.content);

    const article = await this.prismaService.articles.create({
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
        mediaFiles: true,
        categories: true,
        comments: true,
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

    return this.prismaService.articles.update({
      where: { id },
      data,
      include: {
        mediaFiles: true,
        categories: true,
        comments: true,
      },
    });
  }

  async deleteArticle(where: Prisma.ArticlesWhereUniqueInput): Promise<Article> {
    const { id, mediaFiles } = await this.getArticle(where);

    if (mediaFiles.length) {
      await this.deleteMediaFiles(id);
    }

    const deletedArticle = await this.prismaService.articles.delete({
      where: { id },
    });

    return deletedArticle;
  }

  async updateViews(id: string): Promise<Article> {
    await this.getArticle({ id });

    return this.prismaService.articles.update({
      where: {
        id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  async updateLikes(id: string, like: boolean): Promise<Article> {
    await this.getArticle({ id });

    return this.prismaService.articles.update({
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
