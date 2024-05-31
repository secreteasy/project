import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from 'src/entities/shop.entity';
import { Product } from 'src/entities/product.entity';
import { Purchase } from 'src/entities/purchase.entity';
import { CreateShopDto } from './dto/CreateShopDto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async getShopByShopId(shopId: number): Promise<Shop> {
    const shop = this.shopRepository.findOne({
      where: { id: shopId },
      relations: ['products'],
    });
    if (!shop) {
      throw new NotFoundException(`Shop with this Id ${shopId} not found`);
    }
    return shop;
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
    const shop = await this.shopRepository.findOne({
      where: { id },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with Id ${id} not found`);
    }
    await this.shopRepository.delete(id);
    return;
  }

  async getRevenue(shopId: number) {
    const shop = await this.shopRepository.findOne({
      select: { revenue: true },
      where: { id: shopId },
    });
    if (!shop) {
      throw new NotFoundException(`Revenue not found`);
    }
    return shop;
  }

  async getOwnerShop(ownerId: number): Promise<Shop[]> {
    const ownerShop = await this.shopRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['products'],
    });
    if (!ownerShop) {
      throw new NotFoundException(`Owner with this Id ${ownerId} not found`);
    }
    return ownerShop;
  }

  async getAllShops(): Promise<Shop[]> {
    const shops = await this.shopRepository.find({
      relations: ['products'],
    });
    if (!shops) {
      throw new NotFoundException(`Shops not found`);
    }
    return shops;
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
