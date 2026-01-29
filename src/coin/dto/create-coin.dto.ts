import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Coin } from '../entity/coin.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoinDto {
  @ApiProperty({ example: 'USD' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(1)
  codigo: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  price: number;

  constructor(init: CreateCoinDto) {
    Object.assign(this, init);
  }

  asEntity(coin: Coin): Coin {
    return Object.assign(coin, this);
  }
}
