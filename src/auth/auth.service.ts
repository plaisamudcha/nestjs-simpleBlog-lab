import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { UsersService } from 'src/users/users.service';
import { jwtConfig } from 'src/config/env.config';
import { type ConfigType } from '@nestjs/config';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigValue: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {}

  async register(registerBody: RegisterDto) {
    const hashedPassword = await this.bcryptService.hash(registerBody.password);

    await this.usersService.createUser(registerBody.email, hashedPassword);

    return { message: 'User registered successfully' };
  }

  async login(loginBody: LoginDto) {
    const existingUser = await this.usersService.getUserByEmail(
      loginBody.email
    );

    if (!existingUser) {
      throw new ConflictException('Email or password is incorrect');
    }

    const isMatch = await this.bcryptService.compare(
      loginBody.password,
      existingUser.password
    );

    if (!isMatch) {
      throw new ConflictException('Email or password is incorrect');
    }

    const accessToken = await this.jwtService.signAsync({
      id: existingUser.id
    });

    return accessToken;
  }
}
