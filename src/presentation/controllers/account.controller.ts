import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateAccountUseCase } from 'src/application/use-cases/create-account.usecase';
import { DepositMoneyUseCase } from 'src/application/use-cases/deposit-money.usecase';
import { GetAccountBalanceUseCase } from 'src/application/use-cases/get-account-balance.usecase';
import { WithdrawMoneyUseCase } from 'src/application/use-cases/withdraw-money.usecase';
import { CreateAccountDto } from '../dto/create-account.dto';
import { DepositMoneyDto } from '../dto/deposit-money.dto';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly depositMoneyUseCase: DepositMoneyUseCase,
    private readonly withdrawMoneyUseCase: WithdrawMoneyUseCase,
    private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<void> {
    await this.createAccountUseCase.execute(
      createAccountDto.id,
      createAccountDto.ownerName,
    );
  }

  @Post(':id/deposit')
  @HttpCode(HttpStatus.OK)
  async depositMoney(
    @Param('id') accountId: string,
    @Body() depositMoneyDto: DepositMoneyDto,
  ): Promise<void> {
    await this.depositMoneyUseCase.execute(accountId, depositMoneyDto.amount);
  }

  @Post(':id/withdraw')
  @HttpCode(HttpStatus.OK)
  async withdrawMoney(
    @Param('id') accountId: string,
    @Body() withdrawMoneyDto: DepositMoneyDto,
  ): Promise<void> {
    await this.withdrawMoneyUseCase.execute(accountId, withdrawMoneyDto.amount);
  }

  @Get(':id/balance')
  @HttpCode(HttpStatus.OK)
  async getAccountBalance(
    @Param('id') accountId: string,
  ): Promise<{ balance: number }> {
    const balance = await this.getAccountBalanceUseCase.execute(accountId);
    return { balance };
  }
}
