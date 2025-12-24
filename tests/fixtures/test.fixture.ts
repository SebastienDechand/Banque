import type { AccountRepository } from '../../src/domain/account.repository.interface';
import { CreateAccountUseCase } from '../../src/application/use-cases/create-account.usecase';
import { DepositMoneyUseCase } from '../../src/application/use-cases/deposit-money.usecase';
import { WithdrawMoneyUseCase } from '../../src/application/use-cases/withdraw-money.usecase';
import { GetAccountBalanceUseCase } from '../../src/application/use-cases/get-account-balance.usecase';

export function createTestFixture(repository: AccountRepository) {
  return {
    repository,
    createAccount: new CreateAccountUseCase(repository),
    depositMoney: new DepositMoneyUseCase(repository),
    withdrawMoney: new WithdrawMoneyUseCase(repository),
    getAccountBalance: new GetAccountBalanceUseCase(repository),
  };
}
