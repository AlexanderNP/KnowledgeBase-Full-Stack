import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, ArrayNotEmpty, IsOptional } from 'class-validator';
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
    type: [String],
    description: 'Массив ID категорий (MongoDB ObjectId)',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
  })
  @IsMongoIdArray()
  @IsOptional()
  @ArrayNotEmpty({ message: 'Категории не должны быть пустыми' })
  categoryIds: string[];
}
