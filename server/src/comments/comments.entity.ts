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
  userId: string;

  @ApiProperty()
  articleId: string;
}
