import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FileTypes } from 'generated/prisma';

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
