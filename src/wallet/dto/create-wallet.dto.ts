import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Wallet } from '../entity/wallet.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  coinId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;

  constructor(init?: Partial<CreateWalletDto>) {
    Object.assign(this, init);
  }

  asEntity(entity: Wallet): Wallet {
    return Object.assign(entity, this);
  }
}
