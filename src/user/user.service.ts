import { Injectable } from '@nestjs/common';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: Array<User> = [
    {
      id: 'jasdfagq',
      email: 'test@test.com',
      password: 'password',
    },
  ];

  async findUser(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getAll(): Promise<Array<User>> {
    return this.users;
  }
}
