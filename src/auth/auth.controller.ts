import { Controller, Post, UseGuards, HttpCode, Body } from '@nestjs/common';
import { UserData } from '../common/user.decorator';
import { LocalAuthGuard } from './local-auth-guard';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from '../common/dto/user-credentials.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @HttpCode(200)
  @ApiBody({ type: UserCredentialsDto })
  async signIn(@UserData() user) {
    return this.authService.signIn(user);
  }

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() credentials: UserCredentialsDto) {
    return this.authService.signUp(credentials);
  }
}
