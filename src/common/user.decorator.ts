import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserInterface } from '../common/interfaces/user.interface';

export const User = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): Omit<UserInterface, 'password'> | undefined => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
