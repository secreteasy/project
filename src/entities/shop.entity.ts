import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', default: 0 })
  revenue: number;

  @ManyToOne(() => User, (user) => user.shops)
  owner: User;

  @Column()
  ownerId: number;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}
