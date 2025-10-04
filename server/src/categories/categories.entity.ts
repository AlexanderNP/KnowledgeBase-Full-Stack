import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty()
  description: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  imageUrl: string | null;
  @ApiProperty()
  articleIds: string[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updateAt: Date;
}

export class CategoryById extends Category {
  articles: {
    id: string;
    title: string;
    viewCount: number;
    likesCount: number;
    createdAt: Date;
    mediaFiles: { url: string }[];
    comments: { id: string }[];
  }[];
}
