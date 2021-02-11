import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserData } from '../common/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserPresentationDto } from './dto/user-presentation.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@UserData() user: UserDto): Promise<UserPresentationDto> {
    return { id: user.id, email: user.email };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(): Promise<Array<UserPresentationDto>> {
    const users = await this.userService.getAll();

    // Logic like this probably should be separated into separate mapper class
    return users.map((user) => ({ id: user.id, email: user.email }));
  }
}
