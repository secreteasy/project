import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './dto/CreateProductDto';
import { Shop } from 'src/entities/shop.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async createProduct(createProductDTO: CreateProductDto): Promise<Product> {
    const shop = await this.shopRepository.findOneBy({
      id: createProductDTO.shopId,
    });
    if (!shop) {
      throw new NotFoundException(
        `Shop with ID ${createProductDTO.shopId} not found`,
      );
    }
    const product = this.productRepository.create({
      ...createProductDTO,
      shop,
    });
    return this.productRepository.save(product);
  }

  async update(id: number, product: Product): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
