import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.purchases, { eager: true })
  product: Product;

  @Column()
  price: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.purchases, { eager: true })
  user: User;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: 'pending' })
  status: string;
}
