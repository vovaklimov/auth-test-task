import { IUser } from '../interfaces/user.interface';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UserDto implements IUser {
  id: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(16)
  password: string;
}
