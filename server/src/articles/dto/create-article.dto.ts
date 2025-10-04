import {
  IsString,
  IsMongoId,
  Length,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FileTypes } from 'generated/prisma';
import { IsMongoIdArray } from 'src/common/decorators/mongo-id-array.decorator';

export class CreateMediaFilesDto {
  @ApiProperty({
    type: 'string',
    description: 'URL медиафайла',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    enum: FileTypes,
    description: 'Тип файла',
    example: FileTypes.IMG,
  })
  @IsEnum(FileTypes)
  @IsNotEmpty()
  type: FileTypes;
}

export class CreateArticleDto {
  @ApiProperty({
    type: 'string',
    description: 'Заголовок статьи',
    minLength: 5,
    example: 'Как правильно писать статьи',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5)
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'Содержание статьи',
    minLength: 20,
    example: 'В этой статье я расскажу о лучших практиках написания статей...',
  })
  @IsString()
  @IsNotEmpty()
  @Length(20)
  content: string;

  @ApiProperty({
    type: 'string',
    description: 'ID автора статьи (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  authorId: string;

  @ApiPropertyOptional({
    type: [CreateMediaFilesDto],
    description: 'Медиафайлы, прикрепленные к статье',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaFilesDto)
  mediaFiles?: CreateMediaFilesDto[];

  @ApiProperty({
    type: [String],
    description: 'Массив ID категорий (MongoDB ObjectId)',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
  })
  @IsMongoIdArray()
  @ArrayNotEmpty({ message: 'Категории не должны быть пустыми' })
  categoryIds: string[];
}
