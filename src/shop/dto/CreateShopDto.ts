import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShopDto {
  @ApiProperty()
  @IsString()
  name: string;
}
