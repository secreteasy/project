import { Body, Controller, Param, UseGuards, Post, Get } from '@nestjs/common';
import { ShopService } from './shop.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateShopDto } from 'src/entities/shop.entity';
import { CreateProductDto } from 'src/entities/product.entity';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  createShop(
    @Body() createShopDto: CreateShopDto,
    @Param('ownerId') ownerId: number,
  ) {
    return this.shopService.createShop(ownerId, createShopDto);
  }

  @UseGuards(AuthGuard)
  @Post('owner/:ownerId')
  getShopsByOwner(@Param('ownerId') ownerId: number) {
    return this.shopService.getShopsByOwner(ownerId);
  }

  @Post(':shopId/products')
  async addProductToShop(
    @Param('shopId') shopId: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.shopService.addProductToShop(shopId, createProductDto);
  }

  @UseGuards(AuthGuard)
  @Post('confirm-purchase/:productId')
  confirmProductPurchase(@Param('productId') productId: number) {
    return this.shopService.confirmProductPurchase(productId);
  }
  @UseGuards(AuthGuard)
  @Post('purchased/:shopId')
  getPurchasedProductByShop(@Param('shopId') shopId: number) {
    return this.shopService.getPurchasedProductsByShop(shopId);
  }
  @Get()
  getAllShops() {
    return this.shopService.findAll();
  }

  @Get(':id/products')
  getProductsByShopId(@Param('id') id: number) {
    return this.shopService.findProductsByShopId(id);
  }
}
