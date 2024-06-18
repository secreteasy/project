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

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Get(':userId/purchases')
  findPurchasesByUser(@Param('userId') userId: string) {
    return this.userService.findPurchasesByUserId(Number(userId));
  }
}
