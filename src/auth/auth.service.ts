import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/const/errors';
import { createUserDTO } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUsers(dto: createUserDTO): Promise<createUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);

    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }
  async registerUserNames(dto: createUserDTO): Promise<createUserDTO> {
    const existUserName = await this.userService.findUserByUserName(
      dto.userName,
    );
    if (existUserName) throw new BadRequestException(AppError.USERNAME_EXIST);
    return this.userService.createUser(dto);
  }
  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    return;
  }
}
