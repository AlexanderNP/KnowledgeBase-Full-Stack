import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: 'string',
    description: 'Текст комментария',
    example: 'Это очень полезная статья, спасибо автору!',
    required: true,
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: 'string',
    description: 'ID автора комментария (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  authorId: string;

  @ApiProperty({
    type: 'string',
    description: 'ID статьи (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  articleId: string;
}
