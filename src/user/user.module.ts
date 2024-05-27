import { Module } from '@nestjs/common';
import { UserController } from './/user.controller';
import { UserService } from './user.service';
import { ShopsUsersModule } from 'src/shops-users/shops-users.module';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [ShopsUsersModule, ShopModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
