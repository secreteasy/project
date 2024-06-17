import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  shopName: string;

  @IsString()
  name: string;

  @IsString()
  price: number;

  @IsString()
  description: string;

  @IsString()
  category: string;
}
