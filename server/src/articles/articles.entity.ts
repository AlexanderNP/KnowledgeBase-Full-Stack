import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FileTypes } from 'generated/prisma';

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

class ArticleBase {
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
  createdAt: Date;

  @ApiProperty()
  updateAt: Date;

  @ApiProperty()
  categoryIds: string[];
}

export class Article extends ArticleBase {
  @ApiProperty()
  categories: {
    id: string;
    name: string;
  }[];

  @ApiProperty({
    type: [CreateMediaFilesDto],
  })
  mediaFiles: {
    type: FileTypes;
    url: string;
  }[];

  @ApiProperty()
  comments: {
    id: string;
    userId: string;
    content: string;
  }[];
}

export class ArticleWithHeadings extends Article {
  @ApiProperty()
  headings: string[];
}

export class ArticleCreate extends ArticleBase {}

export class ArticleUpdate extends ArticleBase {}

export class ArticleDeleted {
  @ApiProperty()
  id: string;
}
