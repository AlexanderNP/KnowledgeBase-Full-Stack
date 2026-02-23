import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;

  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  articleId: string;
}
