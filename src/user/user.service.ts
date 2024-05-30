import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { createUserDTO } from './dto/createUserDTO';
import { updateUserDto } from './dto/updateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from 'src/entities/shop.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserBy(field: keyof User, value: any): Promise<User> {
    return this.userRepository.findOne({
      where: { [field]: value },
    });
  }

  async createUser(dto: createUserDTO): Promise<User> {
    dto.password = await this.hashPassword(dto.password);
    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    };
    return this.userRepository.save(newUser);
  }

  async publicUser(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstName', 'userName', 'email'],
    });
  }

  async updateUser(id: number, dto: updateUserDto): Promise<updateUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
    await this.userRepository.update(id, dto);
    return dto;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
    return true;
  }

  async findPurchasesByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['purchases'],
    });
    return user.shops.some((shop) => shop.id === userId);
  }

  async isOwnerOfShop(userId: number, shopId: number): Promise<boolean> {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId, ownerId: userId },
    });
    return !!shop;
  }
}
