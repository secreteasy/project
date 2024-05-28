import { Module } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { ProductController } from 'src/product/product.controller';

@Module({
  imports: [],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
