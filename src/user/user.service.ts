import { Injectable } from '@nestjs/common';
import { User } from './/modules/user.module';
import * as bcrypt from 'bcrypt';
import { createUserDTO, updateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findUserByUserName(userName: string) {
    return this.userRepository.findOne({ where: { userName: userName } });
  }
  async createUser(dto: createUserDTO): Promise<createUserDTO> {
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

  async publicUser(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstName', 'userName', 'email'],
    });
  }

  async updateUser(email: string, dto: updateUserDto): Promise<updateUserDto> {
    await this.userRepository.update({ email }, dto);
    return dto;
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.userRepository.delete({ email });
    return true;
  }

  async findPurchasesByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['purchases'],
    });
    return user.shops.some((shop) => shop.id === shopId);
  }
}
