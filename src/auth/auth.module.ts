import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/bcrypt.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConfig } from 'src/config/env.config';
// import { ConfigType } from '@nestjs/config';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';
import { JwtService } from './services/jwt.service';

@Module({
  imports: [
    UsersModule,
    // JwtModule.registerAsync({
    //   inject: [jwtConfig.KEY],
    //   useFactory: (configService: ConfigType<typeof jwtConfig>) => ({
    //     secret: configService.JWT_SECRET,
    //     signOptions: { expiresIn: configService.JWT_EXPIRES_IN }
    //   })
    // }) // Third party module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JwtService],
  exports: [JwtService]
})
export class AuthModule {}
