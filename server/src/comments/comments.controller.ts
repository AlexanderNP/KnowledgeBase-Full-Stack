import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Comment } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthWithoutRoles } from 'src/auth/decorators';
import { ValidationMongoIdPipe } from 'src/common/pipes/validation.mongoId.pipe';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @AuthWithoutRoles()
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentsService.create(createCommentDto);
  }

  @Get(':id')
  async findOne(@Param('id', ValidationMongoIdPipe) id: string): Promise<Comment> {
    return await this.commentsService.findOne(id);
  }

  @AuthWithoutRoles()
  @Put(':id')
  async update(
    @Param('id', ValidationMongoIdPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentsService.update(id, updateCommentDto);
  }

  @AuthWithoutRoles()
  @Delete(':id')
  async delete(@Param('id', ValidationMongoIdPipe) id: string): Promise<Comment> {
    return await this.commentsService.delete(id);
  }
}
