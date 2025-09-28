import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  async createComment() {
    return 'this is create comment path';
  }

  async updateComment(id: string) {
    return `this is update comment id=${id} path`;
  }

  async deleteComment(id: string) {
    return `this is delete comment id=${id} path`;
  }

  async getCommentByBlogId(id: string) {
    return `this is get comment by id=${id} path`;
  }

  async postCommentByBlogId(id: string) {
    return `this is post comment by id=${id} path`;
  }
}
