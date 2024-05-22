import { Module } from '@nestjs/common';
import { ShopsUsersService } from './shops-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { ShopsUsersController } from './shops-users.controller';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, User])],
  controllers: [ShopsUsersController, UserController],
  providers: [ShopsUsersService, UserService, OwnershipGuard],
  exports: [TypeOrmModule],
})
export class ShopsUsersModule {}
