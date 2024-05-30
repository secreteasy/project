import { IsDate, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  productId: number;

  @IsString()
  userId: number;

  @IsDate()
  date: Date;

  @IsString()
  price: number;
}
