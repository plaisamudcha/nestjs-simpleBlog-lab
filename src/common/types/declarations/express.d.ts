import 'express';
import { CurrentUserDto } from 'src/common/dtos/current-user.dto';

declare module 'express' {
  interface Request {
    user?: CurrentUserDto;
  }
}
