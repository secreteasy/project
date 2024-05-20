import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/const/errors';
import { createUserDTO } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

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
    const userData = {
      name: existUser.firstName,
      email: existUser.email,
    };
    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);
    return { ...user, token };
  }
}
