import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { Public } from 'src/common/decorators/guard.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Best Practices: Do not impleement logic in controllers, delegate to services

  @Public()
  @Post('register')
  async register(
    @Body() registerBody: RegisterDto
  ): Promise<{ message: string }> {
    await this.authService.register(registerBody);
    return { message: 'User registered successfully' };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginBody: LoginDto) {
    const accessToken = await this.authService.login(loginBody);
    return { accessToken };
  }
}
