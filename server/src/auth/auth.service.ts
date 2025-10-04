import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

// Подумать над автоматической отчисткой рефреш токенов после окончания срока действия
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signUp(userInput: Prisma.UserCreateInput) {
    const { password, role, ...userRest } = await this.usersService.create(userInput);
    return userRest;
  }

  async signIn(userInput: LoginUserDto) {
    const { password, role, ...userRest } = await this.usersService.login(userInput);
    const payload = { sub: userRest.id, username: userRest.username };
    const tokens = await this.generateTokens(payload);
    await this.saveToken(userRest.id, tokens.refreshToken);

    return { ...userRest, ...tokens };
  }

  async refreshTokens(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken);
    const user = await this.usersService.getUser({ id: payload.sub });
    const newPayload = { sub: user.id, username: user.username };
    const tokens = await this.generateTokens(newPayload);
    await this.saveToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async saveToken(userId: string, refreshToken: string) {
    const token = await this.prismaService.refreshTokens.create({
      data: {
        token: refreshToken,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId,
      },
    });

    return token;
  }

  private async generateTokens(payload: { sub: string; username: string }) {
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    return {
      accessToken,
      refreshToken,
    };
  }
}
