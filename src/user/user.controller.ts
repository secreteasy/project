import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDto } from './dto';
import { jwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: updateUserDto })
  @UseGuards(jwtAuthGuard)
  @Patch()
  updateUser(
    @Body() updateDto: updateUserDto,
    @Req() request,
  ): Promise<updateUserDto> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }
  @UseGuards(jwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }
}
