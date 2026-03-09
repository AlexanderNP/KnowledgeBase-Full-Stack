import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth, AuthWithoutRoles } from 'src/auth/decorators';
import { ValidationMongoIdPipe } from 'src/common/pipes/validation.mongoId.pipe';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Role } from 'generated/prisma';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AuthWithoutRoles()
  @Get(':id')
  async getUserById(@Param('id', ValidationMongoIdPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @AuthWithoutRoles()
  @Put('update/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserDto,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  updateUser(
    @Param('id', ValidationMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.updateUser(id, updateUserDto, avatar);
  }

  @Auth(Role.ADMIN)
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id', ValidationMongoIdPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
