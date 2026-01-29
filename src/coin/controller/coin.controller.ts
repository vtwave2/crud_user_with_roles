import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCoinDto } from '../dto/create-coin.dto';
import { CoinService } from '../coin.service';
import { ParseIntIdPipe } from 'src/common/pipes/parseInt-id.pipe';
import { Coin } from '../entity/coin.entity';
import { UpdateCoinDto } from '../dto/update-coin.dto';

@ApiBearerAuth('jwt-auth')
@ApiTags('Coin')
@UsePipes(ParseIntIdPipe)
@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}
  @Post()
  @ApiOperation({ summary: 'Add a new coin' })
  async create(@Body() createCoinDto: CreateCoinDto): Promise<number> {
    return await this.coinService.create(createCoinDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all coins' })
  async findAll(): Promise<Coin[]> {
    return await this.coinService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find coin' })
  async findOne(@Param('id') id: number): Promise<Coin | null> {
    return await this.coinService.findOne(id);
  }

  @Patch(':id')
  async editCoin(
    @Param('id') id: number,
    @Body() updateCoinDto: UpdateCoinDto,
  ): Promise<boolean> {
    return await this.coinService.updateCoin(id, updateCoinDto);
  }
}
