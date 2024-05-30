import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  shopId: number;

  @IsString()
  name: string;

  @IsString()
  price: number;
}
