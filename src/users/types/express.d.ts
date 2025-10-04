import 'express';
import { UserToken } from './userToken.type';

declare module 'express' {
  interface Request {
    user?: UserToken;
  }
}
