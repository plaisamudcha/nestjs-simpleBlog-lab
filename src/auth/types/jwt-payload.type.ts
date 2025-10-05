import { UserRole } from 'src/common/types/role.type';

export type AccessJwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};
