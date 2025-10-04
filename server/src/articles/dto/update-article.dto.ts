import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMediaFilesDto } from './create-article.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { IsMongoIdArray } from 'src/common/decorators/mongo-id-array.decorator';

export class UpdateArticleDto {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Заголовок статьи',
    minLength: 5,
    example: 'Обновленный заголовок статьи',
  })
  @IsString()
  @IsOptional()
  @Length(5)
  title: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Содержание статьи',
    minLength: 20,
    example: 'Обновленное содержание статьи с дополнительной информацией...',
  })
  @IsString()
  @IsOptional()
  @Length(20)
  content: string;

  @ApiPropertyOptional({
    type: [CreateMediaFilesDto],
    description: 'Медиафайлы, прикрепленные к статье',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaFilesDto)
  mediaFiles: CreateMediaFilesDto[];

  @ApiPropertyOptional({
    type: [String],
    description: 'Массив ID категорий (MongoDB ObjectId)',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
  })
  @IsMongoIdArray()
  @IsOptional()
  @ArrayNotEmpty({ message: 'Категории не должны быть пустыми' })
  categoryIds: string[];
}
