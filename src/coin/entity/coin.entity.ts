import { Wallet } from 'src/wallet/entity/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('coin')
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 4 })
  codigo: string;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Wallet, (wallet) => wallet.coin)
  wallet: Wallet[];
}
