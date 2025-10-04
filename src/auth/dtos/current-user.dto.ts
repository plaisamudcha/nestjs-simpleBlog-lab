import { IsIn, IsString } from 'class-validator';
import { ROLE } from 'src/common/constants/role.constant';

export class CurrentUserDto {
  @IsString()
  id: string;

  @IsString()
  @IsIn(Object.values(ROLE))
  role: string;
}
