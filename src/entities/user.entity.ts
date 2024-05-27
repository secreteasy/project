import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Shop, (shop) => shop.owner)
  shops: Shop[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
