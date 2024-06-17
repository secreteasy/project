import { IsString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  ownerName: string;
}
