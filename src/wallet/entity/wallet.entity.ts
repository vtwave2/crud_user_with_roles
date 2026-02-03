import { Coin } from 'src/coin/entity/coin.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'coin_id' })
  coinId: number;

  @Column('decimal', { default: 0 })
  amount: number;

  @ManyToOne(() => User, (user) => user.wallet)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Coin, (coin) => coin.wallet)
  @JoinColumn({ name: 'coin_id' })
  coin: Coin;
}
