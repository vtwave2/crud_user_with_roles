import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('coin')
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 4 })
  codigo: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
