import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ articleId, authorId, ...comment }: CreateCommentDto) {
    return this.prismaService.comments.create({
      data: {
        ...comment,
        article: {
          connect: {
            id: articleId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const findComment = await this.prismaService.comments.findUnique({
      where: {
        id,
      },
    });

    if (!findComment) {
      throw new NotFoundException(`Комментарий по ID ${id} не найден`);
    }

    return findComment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const findComment = await this.findOne(id);

    return this.prismaService.comments.update({
      where: {
        id: findComment.id,
      },
      data: updateCommentDto,
    });
  }

  async delete(id: string) {
    const findComment = await this.findOne(id);

    return this.prismaService.comments.delete({
      where: {
        id: findComment.id,
      },
    });
  }
}
