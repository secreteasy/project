import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from 'src/entities/purchase.entity';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Purchase> {
    return this.purchaseService.findOne(+id);
  }

  @Post()
  create(@Body() purchase: Purchase): Promise<Purchase> {
    return this.purchaseService.create(purchase);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() purchase: Purchase,
  ): Promise<Purchase> {
    return this.purchaseService.update(+id, purchase);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.purchaseService.remove(+id);
  }
}
