import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    description: 'Название категории',
    minLength: 5,
    example: 'Программирование',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5)
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Описание категории',
    minLength: 15,
    example: 'Статьи о современных технологиях программирования',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(15)
  description: string;
}
