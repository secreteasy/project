import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, Product } from 'src/entities/product.entity';
import { CreateShopDto, Shop, ShopAdmin } from 'src/entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopAdmin)
    private shopAdminRepository: Repository<ShopAdmin>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async createShop(
    ownerId: number,
    createShopDto: CreateShopDto,
  ): Promise<ShopAdmin> {
    const shopAdmin = this.shopAdminRepository.create({
      ...createShopDto,
      ownerId,
    });
    return this.shopAdminRepository.save(shopAdmin);
  }

  async getShopsByOwner(ownerId: number): Promise<Shop[]> {
    return this.shopRepository.find({
      where: { ownerId },
      relations: ['products'],
    });
  }

  async addProductToShop(
    shopId: number,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const shop = await this.shopRepository.findOne({ where: { id: shopId } });

    if (!shop) {
      throw new Error('Shop not found');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      shop,
    });

    return this.productRepository.save(product);
  }

  async confirmProductPurchase(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    product.isPurchased = true;
    return this.productRepository.save(product);
  }

  async getPurchasedProductsByShop(shopId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { shop: { id: shopId }, isPurchased: true },
    });
  }
}
