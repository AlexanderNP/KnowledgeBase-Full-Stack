import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category, CategoryById } from './categories.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationMongoIdPipe } from 'src/common/pipes/validation.mongoId.pipe';
import { Role } from 'generated/prisma';
import { Auth } from 'src/auth/decorators';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Auth(Role.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() createСategoryDto: CreateCategoryDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Category> {
    return this.categoriesService.create(createСategoryDto, image);
  }

  @Get()
  async getCategories(@Query() query: { name: string }): Promise<Category[]> {
    return this.categoriesService.getCategories({
      where: {
        name: { contains: query.name, mode: 'insensitive' },
      },
    });
  }

  @Get(':id')
  async getCategoryById(@Param('id', ValidationMongoIdPipe) id: string): Promise<CategoryById> {
    return this.categoriesService.getCategory({ id });
  }

  @Auth(Role.ADMIN)
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCategory(
    @Param('id', ValidationMongoIdPipe) id: string,
    @Body() updateСategoryDto: UpdateCategoryDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, updateСategoryDto, image);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  async deleteCategory(@Param('id', ValidationMongoIdPipe) id: string): Promise<Category> {
    return this.categoriesService.deleteCategory({ id });
  }
}
