import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from 'src/entities/purchase.entity';
import { CreatePurchaseDto } from './dto/CreatePurchaseDto';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(limit: number): Promise<Purchase[]> {
    return this.purchaseRepository.find({ take: limit });
  }

  async findOne(id: number): Promise<Purchase> {
    return this.purchaseRepository.findOneBy({ id });
  }

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    const product = await this.productRepository.findOneBy({
      id: createPurchaseDto.productId,
    });
    if (!product) {
      throw new NotFoundException(
        `Product with ID ${createPurchaseDto.productId} not found`,
      );
    }

    const user = await this.userRepository.findOneBy({
      id: createPurchaseDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPurchaseDto.userId} not found`,
      );
    }

    const purchase = this.purchaseRepository.create({
      product,
      user,
      date: new Date(),
      price: createPurchaseDto.price,
      confirmed: false,
    });
    return this.purchaseRepository.save(purchase);
  }

  async confirmPurchase(purchaseId: number): Promise<string> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id: purchaseId },
    });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${purchaseId} not found`);
    }

    purchase.confirmed = true;
    purchase.status = 'confirmed';

    await this.purchaseRepository.save(purchase);
    return `Purchase with ID ${purchaseId} has been confirm`;
  }

  async rejectPurchase(purchaseId: number): Promise<string> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id: purchaseId },
    });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${purchaseId} not found`);
    }
    purchase.status = 'rejected';
    await this.purchaseRepository.save(purchase);
    return `Purchase with ID ${purchaseId} has been rejected`;
  }

  async update(id: number, purchase: Purchase): Promise<Purchase> {
    const buy = await this.purchaseRepository.update(id, purchase);
    if (!buy) {
      throw new NotFoundException(`Purchase not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.purchaseRepository.delete(id);
  }

  async getPurchaseByUserId(userId: number): Promise<Purchase[]> {
    const byUserID = this.purchaseRepository.find({
      where: { user: { id: userId } },
      relations: ['product', 'user'],
    });
    if (!byUserID) {
      throw new NotFoundException(
        `Purchase with this user Id ${userId} not found`,
      );
    }
    return;
  }
}
