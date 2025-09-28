import { OmitType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';
import { IsString } from 'class-validator';

export class LoginDto extends OmitType(RegisterDto, [
  'role',
  'password'
] as const) {
  @IsString()
  password: string;
}
