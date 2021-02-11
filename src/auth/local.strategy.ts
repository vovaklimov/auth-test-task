import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { RequestUser } from '../common/interfaces/request-user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<RequestUser> {
    const user = await this.authService.verifyUserByCredentials({
      email,
      password,
    });

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    return { id: user.id, email: user.email };
  }
}
