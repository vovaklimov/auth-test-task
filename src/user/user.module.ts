import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
