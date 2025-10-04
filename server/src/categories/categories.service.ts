import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { Category, CategoryById } from './categories.entity';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async create(
    categoryInput: Prisma.CategoriesCreateInput,
    image?: Express.Multer.File,
  ): Promise<Category> {
    const findCategory = await this.prismaService.categories.findUnique({
      where: {
        name: categoryInput.name,
      },
    });

    if (findCategory) {
      throw new BadRequestException(`Категория с именем ${findCategory.name} уже существует`);
    }

    const imageUrl = await this.createImage(image);
    const data = { ...categoryInput, imageUrl };

    return await this.prismaService.categories.create({ data });
  }

  async getCategories(params: {
    skip?: number;
    take?: number;
    where?: Prisma.CategoriesWhereInput;
    orderBy?: Prisma.CategoriesOrderByWithRelationInput;
    select?: Prisma.CategoriesSelect;
  }) {
    const { skip, take, where, orderBy, select } = params;
    return await this.prismaService.categories.findMany({
      skip,
      take,
      where,
      orderBy,
      select,
    });
  }

  async getCategory(
    categoryWhereUniqueInput: Prisma.CategoriesWhereUniqueInput,
  ): Promise<CategoryById> {
    const findCategory = await this.prismaService.categories.findUnique({
      where: categoryWhereUniqueInput,
      include: {
        articles: {
          select: {
            id: true,
            createdAt: true,
            title: true,
            mediaFiles: {
              where: {
                type: 'IMG',
              },
              select: {
                url: true,
              },
            },
            comments: { select: { id: true } },
            likesCount: true,
            viewCount: true,
          },
        },
      },
    });

    if (!findCategory) {
      throw new NotFoundException(`Категория по ID ${categoryWhereUniqueInput.id} не найдена`);
    }

    return findCategory;
  }

  async updateCategory(
    id: string,
    categoryUpdateData: Prisma.CategoriesUpdateInput,
    image?: Express.Multer.File,
  ): Promise<Category> {
    const findCategory = await this.getCategory({ id });

    if (categoryUpdateData.name) {
      const categories = await this.prismaService.categories.findMany({
        where: {
          id: {
            not: id,
          },
          name: categoryUpdateData.name as string,
        },
      });

      if (categories.length) {
        throw new BadRequestException(
          `Категория с именем ${categoryUpdateData.name as string} уже существует`,
        );
      }
    }

    const imageUrl = await this.updateImage(findCategory.imageUrl, image);
    const data = { ...categoryUpdateData, imageUrl };

    return await this.prismaService.categories.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteCategory(where: Prisma.CategoriesWhereUniqueInput): Promise<Category> {
    const findCategory = await this.getCategory(where);
    const { imageUrl } = findCategory;

    if (imageUrl) {
      await this.minioService.deleteFile(imageUrl);
    }

    return await this.prismaService.categories.delete({
      where,
    });
  }

  private async updateImage(oldImage: string | null, newImage?: Express.Multer.File) {
    if (oldImage) {
      await this.minioService.deleteFile(oldImage);
    }

    return await this.createImage(newImage);
  }

  private async createImage(image?: Express.Multer.File) {
    if (!image) return;

    const fileName = await this.minioService.uploadFile(image);
    return this.minioService.getFileUrl(fileName);
  }
}
