import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  async findOne(id: number): Promise<Purchase> {
    return this.purchaseRepository.findOneBy({ id });
  }

  async create(purchase: Purchase): Promise<Purchase> {
    return this.purchaseRepository.save(purchase);
  }

  async update(id: number, purchase: Purchase): Promise<Purchase> {
    await this.purchaseRepository.update(id, purchase);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.purchaseRepository.delete(id);
  }
}
