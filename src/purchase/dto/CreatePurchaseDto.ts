import { IsNumber } from 'class-validator';

export class CreatePurchaseDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  price: number;
}
