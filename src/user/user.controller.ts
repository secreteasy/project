import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDto } from './dto/updateUserDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { JwtPayload } from 'src/auth/strategy/auth.interface';

@ApiTags('API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, type: updateUserDto })
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() dto: updateUserDto,
  ): Promise<updateUserDto> {
    return this.userService.updateUser(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<boolean> {
    return this.userService.deleteUser(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('purchases')
  async findPurchasesByUser(@CurrentUser() user: JwtPayload) {
    console.log('Current user:', user);
    return this.userService.findPurchasesByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getUserProfile(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
}
