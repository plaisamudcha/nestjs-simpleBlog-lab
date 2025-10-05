import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

import { Request } from 'express';
import { JwtService } from './services/jwt.service';
import { IS_PUBLIC_KEY } from 'src/common/constants/decorator-key';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new BadRequestException('authorization header missing');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new BadRequestException('bad token format');
    }

    if (!token) {
      throw new BadRequestException('token missing');
    }

    try {
      const { sub: id, ...user } =
        await this.jwtService.verifyAccessToken(token);
      request.user = { id, ...user };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('token expired');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('invalid token');
      }
      throw error;
    }

    return true;
  }
}
