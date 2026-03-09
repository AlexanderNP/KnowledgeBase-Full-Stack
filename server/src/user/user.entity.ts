import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'generated/prisma';
import { FavoritesArticle } from 'src/favorites-article/favorites-article.entity';

export class User {
  id: string;
  email: string;
  avatar: string | null;
  username: string;

  @ApiProperty({ type: [FavoritesArticle], required: false })
  favoritesArticle?: FavoritesArticle[];

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;
}
