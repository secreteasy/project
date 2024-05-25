import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.purchases)
  product: Product;

  @Column()
  price: string;

  @Column()
  purchaseDate: Date;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;
}
