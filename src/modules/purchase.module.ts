import { Module } from '@nestjs/common';
import { PurchaseService } from 'src/purchase/purchase.service';
import { PurchaseController } from 'src/purchase/purchase.controller';

@Module({
  imports: [],
  providers: [PurchaseService],
  controllers: [PurchaseController],
  exports: [PurchaseService],
})
export class PurchaseModule {}
