import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from 'src/entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async findAll(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  async findOne(id: number): Promise<Shop> {
    return this.shopRepository.findOneBy({ id });
  }

  async create(shop: Shop): Promise<Shop> {
    return this.shopRepository.save(shop);
  }

  async update(id: number, shop: Shop): Promise<Shop> {
    await this.shopRepository.update(id, shop);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.shopRepository.delete(id);
  }
}
