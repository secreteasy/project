import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/CreateProductDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }
  @ApiTags('API')
  @ApiResponse({ status: 201, type: Product })
  @Post('createProduct')
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.update(+id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(+id);
  }
}
