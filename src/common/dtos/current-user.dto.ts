import { IsIn, IsUUID, IsEmail } from 'class-validator';
import type { UserRole } from '../types/role.type';
import { ROLE } from '../constants/role.constant';

export class CurrentUserDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsIn(Object.values(ROLE))
  role: UserRole;
}
