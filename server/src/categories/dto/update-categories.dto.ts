import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-categories.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Название категории',
    minLength: 5,
    example: 'Обновленное программирование',
    required: false,
  })
  name?: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Описание категории',
    minLength: 15,
    example: 'Обновленные статьи о современных технологиях',
    required: false,
  })
  description?: string;
}
