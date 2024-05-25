import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Request } from 'express';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post(':productId')
  purchaseProduct(
    @Param('productId') productId: number,
    @Req() request: Request,
  ) {
    const user = request.user as { id: number }; // предполагается, что в request хранится информация о пользователе
    return this.purchaseService.purchaseProduct(user.id, productId);
  }

  @Get()
  getPurchasedProducts(@Req() request: Request) {
    const user = request.user as { id: number };
    return this.purchaseService.getPurchasedProducts(user.id);
  }
}
