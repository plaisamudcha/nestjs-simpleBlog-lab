import type { UserRole } from '../types/role.type';

export class CurrentUserDto {
  id: string;
  email: string;
  role: UserRole;
}
