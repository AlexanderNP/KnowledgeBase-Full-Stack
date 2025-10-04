import { ApiProperty } from '@nestjs/swagger';

export class Article {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  categoryIds: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;
}
