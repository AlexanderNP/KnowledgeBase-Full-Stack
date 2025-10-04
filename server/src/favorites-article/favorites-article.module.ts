import { Module } from '@nestjs/common';
import { FavoritesArticleService } from './favorites-article.service';
import { FavoritesArticleController } from './favorites-article.controller';

@Module({
  controllers: [FavoritesArticleController],
  providers: [FavoritesArticleService],
})
export class FavoritesArticleModule {}
