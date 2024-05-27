import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import jwtConfig from 'src/configurations/config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { ShopModule } from 'src/shop/shop.module';
import { PurchaseModule } from 'src/purchase/purchase.module';
import { DataBaseModuleModule } from 'src/data-base-module/data-base-module.module';
import { UserService } from 'src/user/user.service';
import { ShopService } from 'src/shop/shop.service';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { PurchaseService } from 'src/purchase/purchase.service';

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
  ],
  controllers: [AppController],
  providers: [
    UserService,
    AppService,
    ShopService,
    PurchaseService,
    OwnershipGuard,
    JwtStrategy,
  ],
})
export class AppModule {}
