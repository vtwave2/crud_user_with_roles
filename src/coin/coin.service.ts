import { BadRequestException, Injectable } from '@nestjs/common';
import { CoinRepository } from './repository/coin.repository';
import { Coin } from './entity/coin.entity';
import { DataSource } from 'typeorm';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Injectable()
export class CoinService {
  private readonly coinRepository: CoinRepository;
  constructor(manager: DataSource) {
    this.coinRepository = new CoinRepository(manager.manager);
  }

  async create(createCoinDto: CreateCoinDto): Promise<number> {
    const coinFind = await this.coinRepository.find({
      where: { codigo: createCoinDto.codigo },
    });

    if (coinFind.length > 0) {
      throw new BadRequestException('Moeda já foi registrada');
    }

    const coin = new CreateCoinDto(createCoinDto).asEntity(new Coin());
    await this.coinRepository.save(coin);
    return coin.id;
  }

  async findAll(): Promise<Coin[]> {
    return await this.coinRepository.find();
  }

  async findOne(id: number): Promise<Coin | null> {
    return await this.coinRepository.findOne({ where: { id: id } });
  }

  async updateCoin(id: number, updateCoinDto: UpdateCoinDto): Promise<boolean> {
    const findCoin = await this.coinRepository.findOne({ where: { id: id } });
    if (!findCoin) {
      throw new BadRequestException('Coin not found');
    }

    return !!(await this.coinRepository.save(updateCoinDto));
  }

  async remove(id: number): Promise<boolean> {
    const coin = await this.coinRepository.findOne({ where: { id: id } });
    if (!coin) {
      throw new BadRequestException('Coin not found');
    }
    await this.coinRepository.delete(coin);
    return true;
  }
}
