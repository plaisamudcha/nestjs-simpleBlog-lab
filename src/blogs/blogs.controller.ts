import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CommentsService } from 'src/comments/comments.service';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly commentsService: CommentsService
  ) {}

  @Get()
  async getAllBlogs() {
    return await this.blogsService.getAllBlogs();
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return await this.blogsService.getBlogById(id);
  }

  @Get(':id/comments')
  async getCommentByBlogId(@Param('id') id: string) {
    return await this.commentsService.getCommentByBlogId(id);
  }

  @Post(':id/comments')
  async postCommentByBlogId(@Param('id') id: string) {
    return await this.commentsService.postCommentByBlogId(id);
  }

  @Post()
  async createBlog() {
    return await this.blogsService.createBlog();
  }

  @Patch(':id')
  async updateBlogById(@Param('id') id: string) {
    return await this.blogsService.updateBlog(id);
  }

  @Delete(':id')
  async deleteBlogById(@Param('id') id: string) {
    return await this.blogsService.deleteBlog(id);
  }
}
