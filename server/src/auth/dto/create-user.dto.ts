import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20, { message: 'Имя пользователя должно быть от 3 до 20 символов' })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    minLength: 3,
    maxLength: 20,
    type: 'string',
    description: 'Имя пользователя',
    example: 'ivan_ivanov',
  })
  username: string;

  @IsEmail({}, { message: 'Некорректный email' })
  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @Length(4, 50, { message: 'Пароль должен быть от 4 до 50 символов' })
  @ApiProperty({
    type: 'string',
    format: 'password',
    minLength: 4,
    maxLength: 50,
    description: 'Пароль пользователя',
    example: 'securePassword123!',
  })
  password: string;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @Length(4, 50, { message: 'Пароль должен быть от 4 до 50 символов' })
  @ApiProperty({
    type: 'string',
    format: 'password',
    minLength: 4,
    maxLength: 50,
    description: 'Пароль пользователя',
    example: 'securePassword123!',
  })
  password: string;
}
