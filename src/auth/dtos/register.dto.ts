import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';
import { ROLE } from 'src/common/constants/role.constant';
import { type UserRole } from 'src/common/types/role.type';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  // match with password
  confirmPassword: string;

  @IsOptional()
  @IsIn(Object.values(ROLE))
  role?: UserRole = ROLE.USER;
}
