import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/env.config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
        secret: configService.JWT_SECRET,
        signOptions: { expiresIn: configService.JWT_EXPIRES_IN }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService]
})
export class AuthModule {}
