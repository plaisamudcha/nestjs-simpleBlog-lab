import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/role.type';

export const Public = () => SetMetadata('isPublic', true);

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
