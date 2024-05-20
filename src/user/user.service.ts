import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './/modules/user.module';
import * as bcrypt from 'bcrypt';
import { createUserDTO } from './dto';
// import { AppError } from 'src/common/const/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
  async findUserByUserName(userName: string) {
    return this.userRepository.findOne({ where: { userName: userName } });
  }
  async createUser(dto: createUserDTO): Promise<createUserDTO> {
    // const existUser = await this.findUserByEmail(dto.email);
    // if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    // const existUserName = await this.findUserByUserName(dto.userName);
    // if (existUserName) throw new BadRequestException(AppError.USERNAME_EXIST);
    dto.password = await this.hashPassword(dto.password);
    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    };
    await this.userRepository.create(newUser);
    return dto;
  }

  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }
}
