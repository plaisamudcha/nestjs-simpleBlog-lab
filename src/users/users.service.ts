import { Injectable } from '@nestjs/common';
import { Users } from 'generated/prisma';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    return await this.prismaService.users.findUnique({ where: { email } });
  }

  async createUser(email: string, password: string): Promise<Users> {
    return await this.prismaService.users.create({
      data: { email, password }
    });
  }
}
