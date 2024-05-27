import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from 'src/user/dto/createUserDTO';
import { UserLoginDTO } from 'src/auth/dto/UserLoginDTO';
import { AuthUserResponse } from 'src/auth/dto/AuthUserResponse';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: createUserDTO })
  @Post('register')
  register(@Body() dto: createUserDTO): Promise<createUserDTO> {
    return this.authService.registerUsers(dto);
  }
  @ApiTags('API')
  @ApiResponse({ status: 201, type: createUserDTO })
  @Post('registerUserName')
  registerUserName(@Body() dto: createUserDTO): Promise<createUserDTO> {
    return this.authService.registerUserNames(dto);
  }
  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  async login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return { message: 'Authorized' };
  }
}
