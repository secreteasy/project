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

  async findAll(limit: number): Promise<Product[]> {
    return this.productRepository.find({ take: limit });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with this Id ${id} not found`);
    }
    return product;
  }

  async createProduct(createProductDTO: CreateProductDto): Promise<Product> {
    const shop = await this.shopRepository.findOne({
      where: { name: createProductDTO.shopName },
    });
    if (!shop) {
      throw new NotFoundException(
        `Shop with ID ${createProductDTO.shopName} not found`,
      );
    }
    const product = this.productRepository.create({
      ...createProductDTO,
      shop,
    });
    return this.productRepository.save(product);
  }

  async update(id: number, product: Product): Promise<Product> {
    const up = await this.productRepository.update(id, product);
    if (!up) {
      throw new NotFoundException(`Can not update this product`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const del = await this.productRepository.delete(id);
    if (!del) {
      throw new NotFoundException(`Can not find this product`);
    }
  }
}
