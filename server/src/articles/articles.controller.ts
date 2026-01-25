import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto, FileUploadDto } from './dto';
import { Article } from './articles.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationMongoIdPipe } from 'src/common/pipes/validation.mongoId.pipe';
import { AuthWithoutRoles } from 'src/auth/decorators';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @AuthWithoutRoles()
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articlesService.createArticle(createArticleDto);
  }

  @Get()
  async getAticles(@Query() query: { title: string }): Promise<Article[]> {
    return this.articlesService.getArticles({
      where: {
        title: {
          contains: query.title,
          mode: 'insensitive',
        },
      },
    });
  }

  @Get(':id')
  async getArticleById(@Param('id', ValidationMongoIdPipe) id: string): Promise<Article> {
    return await this.articlesService.getArticle({ id });
  }

  @Put('views/:id')
  async updateViews(@Param('id', ValidationMongoIdPipe) id: string) {
    return await this.articlesService.updateViews(id);
  }

  @AuthWithoutRoles()
  @Put('likes/:id')
  async updateLikes(@Param('id', ValidationMongoIdPipe) id: string, like: boolean) {
    return await this.articlesService.updateLikes(id, like);
  }

  @AuthWithoutRoles()
  @Put('update/:id')
  async updateArticle(
    @Param('id', ValidationMongoIdPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articlesService.updateArticle(id, updateArticleDto);
  }

  @AuthWithoutRoles()
  @Delete(':id')
  async deleteArticle(@Param('id', ValidationMongoIdPipe) id: string): Promise<Article> {
    return this.articlesService.deleteArticle({ id });
  }

  // Продумать логику отчистика бакета, если пользователь в моменте передумал создавать статью, а ссылка уже есть

  @AuthWithoutRoles()
  @Post('file/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Загрузить файлы/изображения к статье',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.articlesService.createFile(file);
  }
}
