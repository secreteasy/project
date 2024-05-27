import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDto } from './dto/createUserDTO';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { CurrentUser } from 'src/decorator/current-user.decorator';
import { OwnershipGuard } from 'src/guards/ownership.guard';
// import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: updateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() updateDto: updateUserDto,
    @Req() request,
  ): Promise<updateUserDto> {
    const user = request.user;
    return this.userService.updateUser(user.email, updateDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }

  // @UseGuards(JwtAuthGuard, OwnershipGuard)
  // @Get(':userId/purchases')
  // findPurchasesByUser(@Param('userId') userId: string) {
  //   return this.userService.findPurchasesByUserId(Number(userId));
  // }
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Get(':userId/purchases')
  findPurchasesByUser(@Param('userId') userId: string) {
    return this.userService.findPurchasesByUserId(Number(userId));
  }
}
