import { Controller, Post, UseGuards, HttpCode, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserData } from '../common/user.decorator';
import { LocalAuthGuard } from './local-auth-guard';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from '../common/dto/user-credentials.dto';
import { UserPresentationDto } from '../user/dto/user-presentation.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserCredentialsDto })
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @HttpCode(200)
  async signIn(@UserData() user) {
    return this.authService.signIn(user);
  }

  @Post('/signup')
  @HttpCode(201)
  async signUp(
    @Body() credentials: UserCredentialsDto,
  ): Promise<UserPresentationDto> {
    const user = await this.authService.signUp(credentials);

    return { id: user.id, email: user.email };
  }
}
