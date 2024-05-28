import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from 'src/entities/shop.entity';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
import { Purchase } from 'src/entities/purchase.entity';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll(): Promise<Shop[]> {
    return this.shopService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Shop> {
  //   return this.shopService.findOne(+id);
  // }

  @Post('create')
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

  @ApiTags('API')
  @ApiResponse({ status: 201, type: Shop })
  @Get(':shopId')
  getShop(@Param('shopId') shopId: number): Promise<Shop> {
    return this.shopService.getShopByShopId(shopId);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: [Shop] })
  @Get('owner/:ownerId')
  getOwnerShop(@Param('ownerId') ownerId: number): Promise<Shop[]> {
    return this.shopService.getOwnerShop(ownerId);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: Shop })
  @Get()
  getAllShops(): Promise<Shop[]> {
    return this.shopService.getAllShops();
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: [Product] })
  @Get(':shopId/products')
  getProductsByShopId(@Param('shopId') shopId: number): Promise<Product[]> {
    return this.shopService.getProductsByShopId(shopId);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: [Purchase] })
  @Get(':shopId/purchases')
  getPurchasesbyShopId(@Param('shopId') shopId: number): Promise<Purchase[]> {
    return this.shopService.getPurchasesByShopId(shopId);
  }

  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @Get(':shopId/revenue')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getShopRevenue(@Param('shopId') shopId: string, @CurrentUser() user: User) {
    return this.shopService.getRevenue(Number(shopId));
  }
}
