import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/role.type';
import { IS_PUBLIC_KEY, ROLES_KEY } from '../constants/decorator-key';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
