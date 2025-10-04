import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import type { IJWTPayload } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    if (request.cookies?.refreshToken) {
      const { sub } = this.jwtService.decode<IJWTPayload>(request.cookies.refreshToken as string);
      const findUser = await this.userService.getUser({ id: sub });

      if (findUser.role === Role.ADMIN) {
        return true;
      }
    }

    return false;
  }
}
