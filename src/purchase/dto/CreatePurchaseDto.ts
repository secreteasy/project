import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty()
  @IsString()
  productId: number;

  @ApiProperty()
  @IsString()
  userId: number;

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  price: number;
}
