import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop, ShopAdmin } from 'src/entities/shop.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Purchase } from 'src/entities/purchase.entity';
import { PurchaseService } from 'src/purchase/purchase.service';
import { PurchaseController } from 'src/purchase/purchase.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop, ShopAdmin, Product, User, Purchase]),
  ],
  providers: [ShopService, PurchaseService],
  controllers: [ShopController, PurchaseController],
})
export class ShopModule {}
