import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Shop } from './shop.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  category: string;

  @ManyToOne(() => Shop, (shop) => shop.products, { nullable: true })
  shop: Shop;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];
}
