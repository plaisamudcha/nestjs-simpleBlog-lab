import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { Blogs } from 'generated/prisma';

@Injectable()
export class BlogsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBlogs() {
    return 'this is get all blog path';
  }

  async getBlogById(id: string) {
    return `this is get blog by id=${id} path`;
  }

  createBlog(userId: string, data: CreateBlogDto): Promise<Blogs> {
    const { tags, ...createBlog } = data;
    return this.prismaService.blogs.create({
      data: {
        ...createBlog,
        userId,
        tags: {
          createMany: { data: tags?.map((tag) => ({ name: tag })) ?? [] }
        }
      },
      include: { tags: true }
    });
  }

  async updateBlog(id: string) {
    return `this is update blog id=${id} path`;
  }

  async deleteBlog(id: string) {
    return `this is delete blog id=${id} path`;
  }
}
