import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { userId, shopId } = request.params;

    if (userId && user.id !== Number(userId)) {
      return false;
    }

    if (shopId) {
      return this.userService.isOwnerOfShop(user.id, Number(shopId));
    }
    return true;
  }
}
