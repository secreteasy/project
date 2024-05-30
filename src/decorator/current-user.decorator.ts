import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new Error('User not found in request');
    }
    return user;
  },
);
