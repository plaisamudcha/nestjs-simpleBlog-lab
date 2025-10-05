import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class BlogsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBlogs() {
    return 'this is get all blog path';
  }

  async getBlogById(id: string) {
    return `this is get blog by id=${id} path`;
  }

  async createBlog(id: string, data: CreateBlogDto) {
    try {
      await this.prismaService.blogs.create({
        data: {
          title: data.title,
          content: data.content,
          userId: id,
          ...(data.tags && {
            tags: {
              create: data.tags.map((tagName) => ({
                name: tagName
              }))
            }
          })
        }
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('User does not exist');
      }
    }
  }

  async updateBlog(id: string) {
    return `this is update blog id=${id} path`;
  }

  async deleteBlog(id: string) {
    return `this is delete blog id=${id} path`;
  }
}
