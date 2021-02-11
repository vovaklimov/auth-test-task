import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '../user/user.service';
import { UserCredentials } from '../common/interfaces/user-credentials.interface';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, id }: UserDocument) {
    return this.issueAccessToken({ userId: id, email });
  }

  async signUp(credentials: UserCredentials) {
    return this.userService.createUser(credentials);
  }

  async verifyUserByCredentials({
    email,
    password,
  }: UserCredentials): Promise<Omit<UserDocument, 'password' | undefined>> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return;
    }

    const passwordsMatch = await this.verifyPassword(password, user.password);

    if (passwordsMatch) {
      return user;
    }
  }

  async verifyPassword(passwordToVerify: string, storedPasswordHash: string) {
    return compare(passwordToVerify, storedPasswordHash);
  }

  private async issueAccessToken(payload: Record<string, unknown>) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
