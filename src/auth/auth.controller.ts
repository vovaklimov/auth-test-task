import { Controller, Post, UseGuards, HttpCode, Body } from '@nestjs/common';
import { UserData } from '../common/user.decorator';
import { LocalAuthGuard } from './local-auth-guard';
import { AuthService } from './auth.service';
import { UserCredentials } from '../common/interfaces/user-credentials.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @HttpCode(200)
  async signIn(@UserData() user) {
    return this.authService.signIn(user);
  }

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() credentials: UserCredentials) {
    return this.authService.signUp(credentials);
  }
}
