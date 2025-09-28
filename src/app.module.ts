import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { envConfig, jwtConfig } from './config/env.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    BlogsModule,
    CommentsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      load: [envConfig, jwtConfig]
    }),
    UsersModule
  ]
})
export class AppModule {}
