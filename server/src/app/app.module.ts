import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.modules';
import { MinioModule } from 'src/minio/minio.module';
import { CommentsModule } from 'src/comments/comments.module';
import { FavoritesArticleModule } from 'src/favorites-article/favorites-article.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ArticlesModule } from 'src/articles/articles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    MinioModule,
    AuthModule,
    CategoriesModule,
    ArticlesModule,
    CommentsModule,
    FavoritesArticleModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
