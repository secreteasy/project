import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from 'src/user/dto/createUserDTO';
import { UserLoginDTO } from 'src/auth/dto/UserLoginDTO';
import { AuthUserResponse } from 'src/auth/dto/AuthUserResponse';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: createUserDTO })
  @Post('register')
  register(@Body() dto: createUserDTO): Promise<createUserDTO> {
    return this.authService.registerUser(dto);
  }

  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  async login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @Post('test')
  test() {
    return { message: 'Authorized' };
  }
}
