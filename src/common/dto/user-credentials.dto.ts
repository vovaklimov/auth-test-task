import { UserCredentials } from '../interfaces/user-credentials.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDto implements UserCredentials {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  @MinLength(4)
  password: string;
}
