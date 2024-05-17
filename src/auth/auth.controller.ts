import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from 'src/user/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: createUserDTO): Promise<createUserDTO> {
    return this.authService.registerUsers(dto);
  }
  @Post('registerUserName')
  registerUserName(@Body() dto: createUserDTO): Promise<createUserDTO> {
    return this.authService.registerUserNames(dto);
  }
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
