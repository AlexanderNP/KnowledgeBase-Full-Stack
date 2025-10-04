import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'generated/prisma';

class FavoritesArticle {
  id: string;

  articleId: string;

  userId: string;

  savedAt: Date;
}

export class User {
  id: string;
  email: string;
  username: string;

  @ApiProperty({ type: [FavoritesArticle], required: false })
  favoritesArticle?: FavoritesArticle[];

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;
}
