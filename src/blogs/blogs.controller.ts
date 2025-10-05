import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CommentsService } from 'src/comments/comments.service';
import { Public, Roles } from 'src/common/decorators/guard.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dtos/current-user.dto';
import { CreateBlogDto } from './dtos/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly commentsService: CommentsService
  ) {}

  @Public()
  @Get()
  async getAllBlogs() {
    return await this.blogsService.getAllBlogs();
  }

  @Public()
  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return await this.blogsService.getBlogById(id);
  }

  @Public()
  @Get(':id/comments')
  async getCommentByBlogId(@Param('id') id: string) {
    return await this.commentsService.getCommentByBlogId(id);
  }

  @UseGuards(RoleGuard)
  @Roles('USER', 'ADMIN')
  @Post(':id/comments')
  async postCommentByBlogId(@Param('id') id: string) {
    return await this.commentsService.postCommentByBlogId(id);
  }

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Post()
  createBlog(
    @CurrentUser() user: CurrentUserDto,
    @Body() data: CreateBlogDto
  ) {}

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async updateBlogById(@Param('id') id: string) {
    return await this.blogsService.updateBlog(id);
  }

  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async deleteBlogById(@Param('id') id: string) {
    return await this.blogsService.deleteBlog(id);
  }
}
