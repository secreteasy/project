import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { AppService } from '../app/app.service';
import { UserModule } from 'src/modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth.module';
import { TokenModule } from 'src/auth/token/token.module';
import jwtConfig from 'src/configurations/config';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ShopModule } from 'src/modules/shop.module';
import { PurchaseModule } from 'src/modules/purchase.module';
import { DataBaseModuleModule } from 'src/data-base-module/data-base-module.module';
import { UserService } from 'src/user/user.service';
import { ShopService } from 'src/shop/shop.service';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { PurchaseService } from 'src/purchase/purchase.service';
import { ProductModule } from 'src/modules/product.module';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    DataBaseModuleModule,
    UserModule,
    AuthModule,
    TokenModule,
    ShopModule,
    PurchaseModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    UserService,
    AppService,
    ShopService,
    PurchaseService,
    OwnershipGuard,
    JwtStrategy,
    ProductService,
  ],
})
export class AppModule {}
