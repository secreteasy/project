import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ShopsUsersService } from './shops-users.service';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('shops-users')
export class ShopsUsersController {
  constructor(private readonly shopsUsersService: ShopsUsersService) {}

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Get(':shopId/revenue')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getShopRevenue(@Param('shopId') shopId: string, @CurrentUser() user: User) {
    return this.shopsUsersService.getRevenue(Number(shopId));
  }
}
