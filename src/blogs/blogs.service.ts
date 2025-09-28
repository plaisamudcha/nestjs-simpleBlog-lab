import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsService {
  async getAllBlogs() {
    return 'this is get all blog path';
  }

  async getBlogById(id: string) {
    return `this is get blog by id=${id} path`;
  }

  async createBlog() {
    return 'this is create blog path';
  }

  async updateBlog(id: string) {
    return `this is update blog id=${id} path`;
  }

  async deleteBlog(id: string) {
    return `this is delete blog id=${id} path`;
  }
}
