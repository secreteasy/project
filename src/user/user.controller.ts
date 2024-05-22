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
import { updateUserDto } from './dto';
import { jwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { User } from 'src/entities/user.entity';

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
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.email);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Get(':userId/purchases')
  findPurchasesByUser(
    @Param('userId') userId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser() user: User,
  ) {
    return this.userService.findPurchasesByUserId(Number(userId));
  }
}
