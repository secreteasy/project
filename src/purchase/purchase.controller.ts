import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from 'src/entities/purchase.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePurchaseDto } from './dto/CreatePurchaseDto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Purchase> {
  //   return this.purchaseService.findOne(+id);
  // }
  @ApiTags('API')
  @ApiResponse({ status: 201, type: Purchase })
  @Post('createPurchase')
  createPurchase(
    @Body() createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: Purchase })
  @Post(':purchaseId/confirm')
  async confirmPurchase(@Param('purchaseId') purchaseId: number) {
    try {
      const confirmedPurchase =
        await this.purchaseService.confirmPurchase(purchaseId);
      return {
        message: 'Purchase confirmed successfully',
        purchase: confirmedPurchase,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: Purchase })
  @Delete(':purchaseId/reject')
  async rejectPurchase(@Param('purchaseId') purchaseId: number) {
    try {
      await this.purchaseService.rejectPurchase(purchaseId);
      return { message: 'Purchase rejected successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiTags('API')
  @ApiResponse({ status: 201, type: [Purchase] })
  @Get(':userId')
  getPurchase(@Param('userId') userId: number): Promise<Purchase[]> {
    return this.purchaseService.getPurchaseByUserId(userId);
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
