import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserCreateInput } from './types/input.type';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getUserByEmail(email: string) {
    return this.prismaService.users.findUnique({ where: { email } });
  }

  async createUser(data: UserCreateInput): Promise<void> {
    try {
      await this.prismaService.users.create({ data });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }
}
