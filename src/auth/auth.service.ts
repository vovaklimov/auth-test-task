import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../common/interfaces/user.interface';
import { UserCredentials } from './interfaces/user-credentials.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ id, email }: User) {
    return this.issueAccessToken({ userId: id, email });
  }

  async verifyUserByCredentials({
    email,
    password,
  }: UserCredentials): Promise<Omit<User, 'password' | undefined>> {
    const user = await this.userService.findUser(email);

    if (user !== undefined && password === user.password) {
      delete user.password;
      return user;
    }
  }

  private async issueAccessToken(payload: Record<string, unknown>) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
