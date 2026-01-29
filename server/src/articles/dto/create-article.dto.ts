import { IsString, IsMongoId, Length, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdArray } from 'src/common/decorators/mongo-id-array.decorator';

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

  @ApiProperty({
    type: [String],
    description: 'Массив ID категорий (MongoDB ObjectId)',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
  })
  @IsMongoIdArray()
  @ArrayNotEmpty({ message: 'Категории не должны быть пустыми' })
  categoryIds: string[];
}
