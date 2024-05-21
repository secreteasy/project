import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { UsersService } from './users.service';
import { ShopsController } from './shops.controller';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { User } from './entities/user.entity';
import { OwnershipGuard } from './guards/ownership.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, User])],
  controllers: [ShopsController, UsersController],
  providers: [ShopsService, UsersService, OwnershipGuard],
})
export class ShopsUsersModule {}
