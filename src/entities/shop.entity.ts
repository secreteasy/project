import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  revenue: number;

  @ManyToOne(() => User, (user) => user.shops)
  owner: User;

  @Column()
  ownerId: number;
}
