import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Обновленный текст комментария',
    example: 'Обновленный текст комментария с дополнительной информацией',
    required: false,
  })
  content?: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'ID автора комментария (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsMongoId()
  userId?: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'ID статьи (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439012',
    required: false,
  })
  @IsMongoId()
  articleId?: string;
}
