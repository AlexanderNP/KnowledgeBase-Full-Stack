import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from '../auth/dto';
import { Prisma, Role, User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userInput: Prisma.UserCreateInput): Promise<User> {
    const findUser = await this.prismaService.user.findUnique({
      where: { email: userInput.email },
    });

    if (findUser) {
      throw new BadRequestException(`Пользователь ${userInput.email} уже существует`);
    }

    const data = { ...userInput, role: Role.USER };

    return await this.prismaService.user.create({ data });
  }

  async login(userInput: LoginUserDto): Promise<User> {
    const findUser = await this.getUser({ email: userInput.email });

    if (findUser.password !== userInput.password) {
      throw new UnauthorizedException('Неправильный пароль');
    }

    return findUser;
  }

  async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect) {
    const findUser = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      select,
    });

    if (!findUser) {
      throw new NotFoundException(`Пользователь ${userWhereUniqueInput.email} не найден`);
    }

    return findUser;
  }
}
