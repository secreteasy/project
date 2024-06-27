import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { createUserDTO } from './dto/createUserDTO';
import { updateUserDto } from './dto/updateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from 'src/entities/shop.entity';
import { Purchase } from 'src/entities/purchase.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Purchase)
    private readonly purchaseRerository: Repository<Purchase>,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserBy(field: keyof User, value: any): Promise<User> {
    const user = this.userRepository.findOne({
      where: { [field]: value },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(dto: createUserDTO): Promise<User> {
    dto.password = await this.hashPassword(dto.password);
    const newUser = {
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    };
    if (!newUser) {
      throw new NotFoundException(`Wrong data/user already exsist`);
    }
    return this.userRepository.save(newUser);
  }

  async publicUser(email: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { email },
      select: ['id', 'firstName', 'userName', 'email'],
    });
    if (!user) {
      throw new NotFoundException(`User not exist`);
    }
    return user;
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

  async findPurchasesByUserId(userId: number): Promise<Purchase[]> {
    console.log('Fetching purchases for user ID:', userId);
    const purchases = await this.purchaseRerository.find({
      where: { user: { id: userId } },
      relations: ['user', 'product'],
    });

    console.log('Fetched purchases:', purchases);
    if (!purchases || purchases.length === 0) {
      throw new NotFoundException(`User with ID ${userId} has no purchases`);
    }
    return purchases;
  }

  async isOwnerOfShop(userId: number, shopId: number): Promise<boolean> {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId, ownerId: userId },
    });
    if (!shop) {
      throw new NotFoundException(`Owner or shop not found`);
    }
    return !!shop;
  }
}
