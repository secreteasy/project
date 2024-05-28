import { Module } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { ShopController } from 'src/shop/shop.controller';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';

@Module({
  imports: [],
  providers: [ShopService, OwnershipGuard, UserService],
  controllers: [ShopController, UserController],
  exports: [ShopService],
})
export class ShopModule {}
