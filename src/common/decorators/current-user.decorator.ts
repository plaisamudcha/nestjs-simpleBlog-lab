import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUserDto } from '../dtos/current-user.dto';

export const CurrentUser = createParamDecorator(
  (_: string, context: ExecutionContext): Partial<CurrentUserDto> => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      return {};
    }

    const result: Partial<CurrentUserDto> = {
      id: user.id,
      role: user.role,
      //   eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      email: user.email
    };

    return result;
  }
);
