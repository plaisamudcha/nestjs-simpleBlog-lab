import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Patch(':id')
  async updateComment(@Param('id') id: string) {
    return await this.commentsService.updateComment(id);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return await this.commentsService.deleteComment(id);
  }
}
