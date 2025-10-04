import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserRole } from 'src/common/types/role.type';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    const request = context.switchToHttp().getRequest<Request>();

    if (request.user?.role && role.includes(request.user.role)) return true;
    throw new ForbiddenException('Invalid role');
  }
}
