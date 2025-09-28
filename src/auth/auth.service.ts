import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register() {
    return 'This action registers a user';
  }

  async login() {
    return 'This action logs in a user';
  }
}
