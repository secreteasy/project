import { Module } from '@nestjs/common';
import { ShopsUsersService } from './shops-users.service';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { ShopsUsersController } from './shops-users.controller';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@Module({
  imports: [],
  controllers: [ShopsUsersController, UserController],
  providers: [ShopsUsersService, UserService, OwnershipGuard],
  exports: [],
})
export class ShopsUsersModule {}
