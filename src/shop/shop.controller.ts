import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from 'src/entities/shop.entity';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll(): Promise<Shop[]> {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Shop> {
    return this.shopService.findOne(+id);
  }

  @Post()
  create(@Body() shop: Shop): Promise<Shop> {
    return this.shopService.create(shop);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() shop: Shop): Promise<Shop> {
    return this.shopService.update(+id, shop);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shopService.remove(+id);
  }
}
