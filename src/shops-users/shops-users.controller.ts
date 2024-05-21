import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ShopsUsersService } from './shops-users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('shops-users')
export class ShopsUsersController {
  constructor(private readonly shopsUsersService: ShopsUsersService) {}

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Get(':shopId/revenue')
  getShopRevenue(@Param('shopId') shopId: string, @CurrentUser() user) {
    return this.shopsUsersService.getRevenue(Number(shopId));
  }
}
