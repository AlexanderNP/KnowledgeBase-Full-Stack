import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUser, Tokens } from './auth.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiCookieAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() loginUserDto: LoginUserDto, @Res() response: Response): Promise<AuthUser> {
    const signUser = await this.authService.signIn(loginUserDto);

    response.cookie('refreshToken', signUser.refreshToken, {
      httpOnly: true,
      sameSite: 'none', // иначе браузер заблокирует
      secure: false, // локально без https нужно false
      maxAge: 7 * 24 * 3600000,
    });

    return response.json(signUser) as unknown as AuthUser;
  }

  @Post('signUp')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<AuthUser, 'accessToken' | 'refreshToken'>> {
    return this.authService.signUp(createUserDto);
  }

  @ApiCookieAuth()
  @Post('refresh')
  async refresh(@Req() request: Request, @Res() response: Response): Promise<Tokens> {
    const refreshToken: string = request.cookies?.refreshToken;

    if (!refreshToken) throw new UnauthorizedException('Refresh token не был найден');

    const tokens = await this.authService.refreshTokens(refreshToken);

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none', // иначе браузер заблокирует
      secure: false, // локально без https нужно false
      maxAge: 7 * 24 * 3600000,
    });

    return response.json(tokens) as unknown as Tokens;
  }
}
