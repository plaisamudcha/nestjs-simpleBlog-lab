import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from '@nestjs/jwt';

import { Request } from 'express';
import { JwtService } from './services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization?.split(' ')[1];

    if (!authHeader) {
      throw new UnauthorizedException('token missing');
    }

    try {
      const payload = await this.jwtService.verifyAccessToken(authHeader);
      request.user = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('token expired');
      }
      throw new UnauthorizedException('invalid token');
    }

    return true;
  }
}
