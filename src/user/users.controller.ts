import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserData } from '../common/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@UserData() user) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll() {
    return this.userService.getAll();
  }
}
