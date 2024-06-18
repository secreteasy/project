import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/const/errors';
import { createUserDTO } from 'src/user/dto/createUserDTO';
import { UserService } from 'src/user/user.service';
import { UserLoginDTO } from 'src/auth/dto/UserLoginDTO';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from 'src/auth/dto/AuthUserResponse';
import { TokenService } from 'src/auth/token/token.service';
import { JwtPayload } from './strategy/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: createUserDTO): Promise<createUserDTO> {
    const existUser = await this.userService.findUserBy('email', dto.email);
    if (existUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    const existUserName = await this.userService.findUserBy(
      'userName',
      dto.userName,
    );
    if (existUserName) {
      throw new BadRequestException(AppError.USERNAME_EXIST);
    }
    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserBy('email', dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);

    const payload: JwtPayload = {
      id: existUser.id,
      email: existUser.email,
      userName: existUser.userName,
    };

    const token = await this.tokenService.generateJwtToken(payload);
    const user = await this.userService.publicUser(dto.email);
    return { ...user, token, role: existUser.role };
  }
}
