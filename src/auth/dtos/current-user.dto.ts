import { IsIn, IsString } from 'class-validator';
import { ROLE } from 'src/common/constants/role.constant';
import type { UserRole } from 'src/common/types/role.type';

export class CurrentUserDto {
  @IsString()
  id: string;

  @IsString()
  @IsIn(Object.values(ROLE))
  role: UserRole;
}
