import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class ShopsUsersService {
  constructor(
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
  ) {}

  async getRevenue(shopId: number) {
    const shop = await this.shopsRepository.findOne({ where: { id: shopId } });
    return shop.revenue;
  }
}
