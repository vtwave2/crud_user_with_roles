import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { UserModule } from 'src/user/user.module';
import { CoinModule } from 'src/coin/coin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), UserModule, CoinModule],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
