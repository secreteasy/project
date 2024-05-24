import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop, ShopAdmin } from './shop.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Shop, (shop) => shop.products, { nullable: true })
  shop: Shop;

  @ManyToOne(() => ShopAdmin, (shopAdmin) => shopAdmin.products, {
    nullable: true,
  })
  shopAdmin: ShopAdmin;

  @Column({ default: false })
  isPurchased: boolean;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  shopId: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  price: number;
}
