import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoritesArticleDto } from './dto/create-favorites-article.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class FavoritesArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ articleId, userId }: CreateFavoritesArticleDto) {
    return this.prismaService.favoritesArticle.create({
      data: {
        articleId,
        userId,
      },
    });
  }

  async findOne(id: string) {
    const findFavoriteArticle = await this.prismaService.favoritesArticle.findUnique({
      where: {
        id,
      },
    });

    if (!findFavoriteArticle) {
      throw new NotFoundException(`Статья по ID ${id} не найден`);
    }

    return findFavoriteArticle;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.FavoritesArticleWhereInput;
    include?: Prisma.FavoritesArticleInclude;
  }) {
    return await this.prismaService.favoritesArticle.findMany({
      ...params,
      include: {
        article: { select: { id: true, title: true } },
      },
      omit: {
        articleId: true,
      },
    });
  }

  async delete(id: string) {
    const findFavoriteArticle = await this.findOne(id);

    await this.prismaService.favoritesArticle.delete({
      where: {
        id: findFavoriteArticle.id,
      },
    });
  }
}
