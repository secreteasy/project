import { Module } from '@nestjs/common';
import { UserController } from './/user.controller';
import { UserService } from './user.service';
import { User } from './/modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopsUsersModule } from 'src/shops-users/shops-users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ShopsUsersModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
