import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/entities/purchase.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async purchaseProduct(userId: number, productId: number): Promise<Purchase> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const purchase = this.purchaseRepository.create({
      user: { id: userId },
      product,
      purchaseDate: new Date(),
    });
    return this.purchaseRepository.save(purchase);
  }

  getPurchasedProducts(userId: number): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }
}
