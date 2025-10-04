import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { FavoritesArticleService } from './favorites-article.service';
import { FavoritesArticle } from './favorites-article.entity';
import { CreateFavoritesArticleDto } from './dto/create-favorites-article.dto';
import { ValidationMongoIdPipe } from 'src/common/pipes/validation.mongoId.pipe';
import { AuthWithoutRoles } from 'src/auth/decorators';

@Controller('favorites-article')
export class FavoritesArticleController {
  constructor(private readonly favoritesArticleService: FavoritesArticleService) {}

  @AuthWithoutRoles()
  @Post()
  async create(
    @Body() createFavoritesArticleDto: CreateFavoritesArticleDto,
  ): Promise<FavoritesArticle> {
    return await this.favoritesArticleService.create(createFavoritesArticleDto);
  }

  @AuthWithoutRoles()
  @Get()
  async findAll(
    @Query('userId', ValidationMongoIdPipe) userId: string,
  ): Promise<FavoritesArticle[]> {
    return await this.favoritesArticleService.findAll({
      where: {
        userId,
      },
    });
  }

  @AuthWithoutRoles()
  @Delete(':id')
  async delete(@Param('id', ValidationMongoIdPipe) id: string): Promise<FavoritesArticle> {
    return await this.favoritesArticleService.delete(id);
  }
}
