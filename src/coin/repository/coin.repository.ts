import { EntityManager, Repository } from 'typeorm';
import { Coin } from '../entity/coin.entity';

export class CoinRepository extends Repository<Coin> {
  constructor(dataSource: EntityManager) {
    super(Coin, dataSource);
  }
}
