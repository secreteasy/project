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
import { CreateShopDto } from './dto/CreateShopDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';

@ApiTags('API')
@Controller('shops')
export class ShopController {
  logger: any;
  constructor(private readonly shopService: ShopService) {}

  @Post('create')
  create(@Body() shop: Shop): Promise<Shop> {
    return this.shopService.create(shop);
  }

  @Put(':id')
  async updateShop(
    @CurrentUser() user: User,
    @Param('id') shopId: number,
    @Body() updateData: Partial<CreateShopDto>,
  ) {
    return this.shopService.updateShop(user.id, shopId, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.shopService.remove(id);
  }

  @ApiResponse({ status: 201, type: Shop })
  @Get('get/:shopId')
  getShop(@Param('shopId') shopId: number): Promise<Shop> {
    return this.shopService.getShopByShopId(shopId);
  }

  @ApiResponse({ status: 201, type: Shop })
  @Get('getAllShops')
  getAllShops(): Promise<Shop[]> {
    return this.shopService.getAllShops();
  }

  @ApiResponse({ status: 201, type: [Product] })
  @Get(':shopId/products')
  getProductsByShopId(@Param('shopId') shopId: number): Promise<Product[]> {
    return this.shopService.getProductsByShopId(shopId);
  }

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

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyShops(@CurrentUser() user: User): Promise<Shop[]> {
    return this.shopService.getOwnerShop(user.id);
  }

  @ApiResponse({ status: 201, type: [Shop] })
  @Get('owner/:ownerId')
  getOwnerShop(@Param('ownerId') ownerId: number): Promise<Shop[]> {
    return this.shopService.getOwnerShop(ownerId);
  }
}
