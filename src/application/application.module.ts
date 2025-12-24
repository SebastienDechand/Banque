import { Module } from '@nestjs/common';
import { CreateAccountUseCase } from './use-cases/create-account.usecase';
import { DepositMoneyUseCase } from './use-cases/deposit-money.usecase';
import { WithdrawMoneyUseCase } from './use-cases/withdraw-money.usecase';
import { GetAccountBalanceUseCase } from './use-cases/get-account-balance.usecase';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateAccountUseCase,
    DepositMoneyUseCase,
    WithdrawMoneyUseCase,
    GetAccountBalanceUseCase,
  ],
  exports: [
    CreateAccountUseCase,
    DepositMoneyUseCase,
    WithdrawMoneyUseCase,
    GetAccountBalanceUseCase,
  ],
})
export class ApplicationModule {}
