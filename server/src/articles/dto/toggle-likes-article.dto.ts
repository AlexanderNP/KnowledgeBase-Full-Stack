import { ApiProperty } from '@nestjs/swagger';

export class ToggleLikeDto {
  @ApiProperty({
    description: 'ID пользователя, который ставит/убирает лайк',
    example: '65f1b9e4c8c2b2a3a1d9e111',
  })
  userId: string;
}
