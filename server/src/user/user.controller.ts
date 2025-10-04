import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationMongoIdPipe } from 'src/common/pipes/validation.mongoId.pipe';
import { AuthWithoutRoles } from 'src/auth/decorators';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AuthWithoutRoles()
  @Get(':id')
  async getCategoryById(@Param('id', ValidationMongoIdPipe) id: string): Promise<User> {
    return this.userService.getUser(
      {
        id,
      },
      {
        id: true,
        email: true,
        username: true,
        favoritesArticle: true,
        role: true,
      },
    );
  }
}
