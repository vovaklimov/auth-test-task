import { UserCredentials } from '../interfaces/user-credentials.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDto implements UserCredentials {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
