import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'generated/prisma';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';

export function Auth(roles: Role) {
  return applyDecorators(ApiBearerAuth(), Roles(roles), UseGuards(JwtAuthGuard, RolesGuard));
}

export function AuthWithoutRoles() {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
}
