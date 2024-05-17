import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUsers(@Body() dto: createUserDTO) {
    console.log(dto);
    return this.userService.createUser(dto);
  }
}
