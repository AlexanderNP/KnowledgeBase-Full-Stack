import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(3, 20, { message: 'Имя пользователя должно быть от 3 до 20 символов' })
  @Transform(({ value }) => value.trim())
  @ApiPropertyOptional({
    minLength: 3,
    maxLength: 20,
    description: 'Имя пользователя',
    example: 'ivan_ivanov',
  })
  username?: string;

  @IsEmail({}, { message: 'Некорректный email' })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @Length(4, 50, { message: 'Пароль должен быть от 4 до 50 символов' })
  @ApiPropertyOptional({
    format: 'password',
    minLength: 4,
    maxLength: 50,
    description: 'Пароль пользователя',
  })
  password?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Аватар пользователя',
  })
  avatar?: any;
}
