import 'express';
import { CurrentUserDto } from 'src/auth/dtos/current-user.dto';

declare module 'express' {
  interface Request {
    user?: CurrentUserDto;
  }
}
