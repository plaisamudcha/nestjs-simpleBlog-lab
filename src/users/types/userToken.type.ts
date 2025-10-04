import { UserRole } from 'src/common/types/role.type';

export type UserToken = {
  id: string;
  role: UserRole;
};
