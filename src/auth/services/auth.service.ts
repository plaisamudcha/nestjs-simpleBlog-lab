import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerBody: RegisterDto): Promise<void> {
    // we not use findEmail because it's chance to race condition
    // const existingUser = await this.usersService.getUserByEmail(
    //   registerBody.email
    // );

    // if (existingUser) {
    //   throw new ConflictException('Email already in use');
    // }

    registerBody.password = await this.bcryptService.hash(
      registerBody.password
    );
    await this.usersService.createUser(registerBody);
  }

  async login(loginBody: LoginDto) {
    const existingUser = await this.usersService.getUserByEmail(
      loginBody.email
    );

    if (!existingUser) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const isMatch = await this.bcryptService.compare(
      loginBody.password,
      existingUser.password
    );

    if (!isMatch) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const accessToken = await this.jwtService.signAccessToken({
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role
    });

    return accessToken;
  }
}
