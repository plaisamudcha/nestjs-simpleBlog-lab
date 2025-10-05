import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { AccessJwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  signAccessToken(payload: AccessJwtPayload): Promise<string> {
    return this.nestJwtService.signAsync(payload);
  }

  verifyAccessToken(token: string): Promise<AccessJwtPayload> {
    return this.nestJwtService.verifyAsync<AccessJwtPayload>(token);
  }
}
