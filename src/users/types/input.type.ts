import { UserRole } from 'src/common/types/role.type';

export type UserCreateInput = {
  email: string;
  password: string;
  role?: UserRole;
};
