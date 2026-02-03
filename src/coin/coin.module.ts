import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from './entity/coin.entity';
import { CoinService } from './coin.service';
import { CoinController } from './controller/coin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coin])],
  providers: [CoinService],
  controllers: [CoinController],
  exports: [CoinService],
})
export class CoinModule {}
