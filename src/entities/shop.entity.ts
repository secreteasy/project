import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', default: 0 })
  revenue: number;

  @ManyToOne(() => User, (user) => user.shops)
  owner: User;

  @Column()
  ownerId: number;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}

export class ShopAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column({ type: 'decimal', default: 0 })
  revenue: number;

  @ManyToOne(() => User, (user) => user.shops)
  owner: User;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}

export class CreateShopDto {
  @ApiProperty()
  @IsString()
  name: string;
}
