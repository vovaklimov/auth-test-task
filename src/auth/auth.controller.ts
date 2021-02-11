import { Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { User } from '../common/user.decorator';
import { LocalAuthGuard } from './local-auth-guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @HttpCode(200)
  async signIn(@User() user) {
    return this.authService.signIn(user);
  }
}
