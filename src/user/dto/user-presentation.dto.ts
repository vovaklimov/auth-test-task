import { IUser } from '../interfaces/user.interface';
import { IsEmail } from 'class-validator';

export class UserPresentationDto implements Omit<IUser, 'password'> {
  id: string;

  @IsEmail()
  email: string;
}
