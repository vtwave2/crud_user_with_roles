import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entity/wallet.entity';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a wallet for a user and coin' })
  @ApiBody({ type: CreateWalletDto })
  @ApiResponse({ status: 201, description: 'Wallet created', type: Wallet })
  @ApiResponse({ status: 400, description: 'Wallet already exists' })
  async create(@Body() dto: CreateWalletDto): Promise<number> {
    return this.walletService.create(dto);
  }

  @Post()
  @ApiOperation({ summary: 'Add coin a wallet existent' })
  @ApiBody({ type: CreateWalletDto })
  @ApiResponse({
    status: 201,
    description: 'Coin add at the wallet',
    type: Wallet,
  })
  @ApiResponse({ status: 400, description: 'Wallet or coin not found' })
  async addCoin(@Body() dto: CreateWalletDto): Promise<number> {
    return this.walletService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Wallet found', type: Wallet })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Wallet> {
    return this.walletService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all wallets from a user' })
  @ApiQuery({ name: 'userId', type: Number, required: true })
  @ApiResponse({
    status: 200,
    description: 'List of user wallets',
    type: [Wallet],
  })
  async findByUser(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<Wallet[]> {
    return this.walletService.findAllByUser(userId);
  }

  @Patch(':id/amount')
  @ApiOperation({ summary: 'Update wallet amount (set value)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 100 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Amount updated' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  async updateAmount(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ): Promise<void> {
    return await this.walletService.updateAmount(id, amount);
  }

  @Patch(':id/change-amount')
  @ApiOperation({ summary: 'Increment or decrement wallet amount' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        value: { type: 'number', example: -10 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Amount changed' })
  @ApiResponse({ status: 400, description: 'Insufficient balance' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  async changeAmount(
    @Param('id', ParseIntPipe) id: number,
    @Body('value') value: number,
  ): Promise<void> {
    return this.walletService.changeAmount(id, value);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wallet' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Wallet deleted' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.walletService.delete(id);
  }
}
