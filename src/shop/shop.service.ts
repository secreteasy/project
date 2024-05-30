import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from 'src/entities/shop.entity';
import { Product } from 'src/entities/product.entity';
import { Purchase } from 'src/entities/purchase.entity';
import { CreateShopDto } from './dto/CreateShopDto';

@Injectable()
export class ShopService {
  logger: any;
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async getShopByShopId(shopId: number): Promise<Shop> {
    return this.shopRepository.findOne({
      where: { id: shopId },
      relations: ['products'],
    });
  }

  async create(shop: Shop): Promise<Shop> {
    return this.shopRepository.save(shop);
  }

  async updateShop(
    userId: number,
    shopId: number,
    updateData: Partial<CreateShopDto>,
  ): Promise<Shop> {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId, ownerId: userId },
    });
    if (!shop) {
      throw new Error('You do not have permission to edit this shop');
    }
    Object.assign(shop, updateData);
    return this.shopRepository.save(shop);
  }

  async remove(id: number): Promise<void> {
    await this.shopRepository.delete(id);
  }

  async getRevenue(shopId: number) {
    const shop = await this.shopRepository.findOne({ where: { id: shopId } });
    return shop.revenue;
  }

  async getOwnerShop(ownerId: number): Promise<Shop[]> {
    return this.shopRepository.find({
      where: { ownerId },
      relations: ['products'],
    });
  }

  async getAllShops(): Promise<Shop[]> {
    return this.shopRepository.find({
      relations: ['products'],
    });
  }

  async getProductsByShopId(shopId: number): Promise<Product[]> {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId },
      relations: ['products'],
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shopId} not found`);
    }
    return shop.products;
  }

  async getPurchasesByShopId(shopId: number): Promise<Purchase[]> {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId },
      relations: ['products'],
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${shopId} not found`);
    }
    const productsIds = shop.products.map((product) => product.id);
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.product', 'product')
      .where('product.id IN (:...productIds)', { productIds: productsIds })
      .getMany();
  }
}
