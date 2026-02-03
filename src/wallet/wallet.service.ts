import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WalletRepository } from './repository/wallet.repository';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entity/wallet.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WalletService {
  private readonly walletRepository: WalletRepository;
  constructor(
    private readonly dataSoruce: DataSource,
    private readonly userService: UserService,
  ) {
    this.walletRepository = new WalletRepository(dataSoruce.manager);
  }

  async create(createWalletDto: CreateWalletDto): Promise<number> {
    const wallet = await this.walletRepository.findOne({
      where: { userId: createWalletDto.userId },
    });

    if (wallet) {
      throw new BadRequestException('Wallet does exist');
    }

    const user = await this.userService.findOne(createWalletDto.userId);

    if (!user) {
      throw new BadRequestException('Wallet exist');
    }

    const createWallet = new CreateWalletDto(createWalletDto).asEntity(
      new Wallet(),
    );
    await this.walletRepository.save(createWallet);

    return createWallet.id;
  }

  async findById(id: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findByIdWithRelations(id);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async findAllByUser(userId: number): Promise<Wallet[]> {
    return this.walletRepository.findAllByUser(userId);
  }

  async updateAmount(id: number, amount: number): Promise<void> {
    if (amount < 0) {
      throw new BadRequestException('Amount cannot be negative');
    }

    const updated = await this.walletRepository.updateAmount(id, amount);

    if (!updated) {
      throw new NotFoundException('Wallet not found');
    }
  }

  async changeAmount(id: number, value: number): Promise<void> {
    const wallet = await this.walletRepository.findById(id);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const newAmount = Number(wallet.amount) + value;

    if (newAmount < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    await this.walletRepository.incrementAmount(id, value);
  }

  async delete(id: number): Promise<void> {
    const wallet = await this.walletRepository.findById(id);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    await this.walletRepository.deleteWallet(id);
  }
}
