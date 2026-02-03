import { EntityManager, Repository } from 'typeorm';
import { Wallet } from '../entity/wallet.entity';
import { CreateWalletDto } from '../dto/create-wallet.dto';

export class WalletRepository extends Repository<Wallet> {
  constructor(manager: EntityManager) {
    super(Wallet, manager);
  }

  async salvar(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = await this.save(createWalletDto);
    return wallet;
  }

  async getWalletById(id: number): Promise<Wallet | null> {
    const wallet = await this.createQueryBuilder('wallet')
      .select()
      .where('wallet.id = :id', { id })
      .getOne();
    return wallet;
  }

  async findByUserAndCoin(
    userId: number,
    coinId: number,
  ): Promise<Wallet | null> {
    return this.createQueryBuilder('wallet')
      .where('wallet.user_id = :userId', { userId })
      .andWhere('wallet.coin_id = :coinId', { coinId })
      .getOne();
  }

  async findById(id: number): Promise<Wallet | null> {
    return this.createQueryBuilder('wallet')
      .where('wallet.id = :id', { id })
      .getOne();
  }

  async findAllByUser(userId: number): Promise<Wallet[]> {
    return this.createQueryBuilder('wallet')
      .leftJoinAndSelect('wallet.coin', 'coin')
      .where('wallet.user_id = :userId', { userId })
      .orderBy('coin.codigo', 'ASC')
      .getMany();
  }

  async findByIdWithRelations(id: number): Promise<Wallet | null> {
    return this.createQueryBuilder('wallet')
      .leftJoinAndSelect('wallet.user', 'user')
      .leftJoinAndSelect('wallet.coin', 'coin')
      .where('wallet.id = :id', { id })
      .getOne();
  }

  async updateAmount(walletId: number, amount: number): Promise<boolean> {
    return !!(await this.createQueryBuilder()
      .update(Wallet)
      .set({ amount })
      .where('id = :walletId', { walletId })
      .execute());
  }

  async incrementAmount(walletId: number, value: number): Promise<boolean> {
    return !!(await this.createQueryBuilder()
      .update(Wallet)
      .set({
        amount: () => `amount + ${value}`,
      })
      .where('id = :walletId', { walletId })
      .execute());
  }

  async deleteWallet(id: number): Promise<boolean> {
    return !!(await this.createQueryBuilder()
      .delete()
      .from(Wallet)
      .where('id = :id', { id })
      .execute());
  }
}
