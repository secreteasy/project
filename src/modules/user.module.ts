import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { ShopModule } from 'src/modules/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
