import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @Column()
  price: string;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;
}
