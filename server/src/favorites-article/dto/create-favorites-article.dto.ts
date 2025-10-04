import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateFavoritesArticleDto {
  @ApiProperty({
    type: 'string',
    description: 'ID статьи, которую добавляют в избранное',
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  articleId: string;

  @ApiProperty({
    type: 'string',
    description: 'ID пользователя, который добавляет статью в избранное',
    example: '507f1f77bcf86cd799439012',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
