import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from '../auth/dto';
import { Prisma, Role, User } from 'generated/prisma';
import { User as UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

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
    const findUser = await this.getUser({ where: { email: userInput.email } });

    if (findUser.password !== userInput.password) {
      throw new UnauthorizedException('Неправильный пароль');
    }

    return findUser;
  }

  async getUserById(id: string) {
    const findUser: UserEntity = await this.getUser({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        favoritesArticle: {
          select: {
            id: true,
            article: { select: { id: true, title: true } },
            userId: true,
            savedAt: true,
          },
        },
        articleLikes: {
          select: {
            articleId: true,
          },
        },
        role: true,
      },
    });

    return findUser;
  }

  async updateUser(id: string, userUpdateData: UpdateUserDto, avatar?: Express.Multer.File) {
    const findUser = await this.getUser({ where: { id } });

    const avatarUrl = await this.updateAvatar(findUser.avatar, avatar);

    const data: UpdateUserDto = { ...userUpdateData, avatar: avatarUrl };

    return await this.prismaService.user.update({
      where: { id },
      data: data,
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        role: true,
      },
    });
  }

  async deleteUser(id: string) {
    const findUser = await this.getUser({ where: { id } });
    const { avatar } = findUser;

    if (avatar) {
      await this.minioService.deleteFile(avatar);
    }

    const deleteComments = this.prismaService.comments.deleteMany({
      where: { authorId: id },
    });

    const deleteRefreshTokens = this.prismaService.refreshTokens.deleteMany({
      where: { userId: id },
    });

    const deleteFavorites = this.prismaService.favoritesArticle.deleteMany({
      where: { userId: id },
    });

    const deleteUser = this.prismaService.user.delete({
      where: { id },
    });

    await this.prismaService.$transaction([
      deleteComments,
      deleteRefreshTokens,
      deleteFavorites,
      deleteUser,
    ]);
  }

  private async getUser(params: {
    where: Prisma.UserWhereUniqueInput;
    include?: Prisma.UserInclude;
    select?: Prisma.UserSelect;
  }) {
    const findUser = await this.prismaService.user.findUnique({
      ...params,
    });

    if (!findUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    return findUser;
  }

  private async updateAvatar(oldImage: string | null, newImage?: Express.Multer.File) {
    if (oldImage) {
      await this.minioService.deleteFile(oldImage);
    }

    return await this.createAvatar(newImage);
  }

  private async createAvatar(image?: Express.Multer.File) {
    if (!image) return;

    const fileName = await this.minioService.uploadFile(image);
    return this.minioService.getFileUrl(fileName);
  }
}
