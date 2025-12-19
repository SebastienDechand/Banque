import type { AccountRepository } from "../../src/domain/account.repository";
import { CreateAccountUseCase } from "../../src/application/create-account.usecase";
import { DepositMoneyUseCase } from "../../src/application/deposit-money.usecase";
import { WithdrawMoneyUseCase } from "../../src/application/withdraw-money.usecase";
import { GetAccountBalanceUseCase } from "../../src/application/get-account-balance.usecase";

export function createTestFixture(repository: AccountRepository) {
  return {
    repository,
    createAccount: new CreateAccountUseCase(repository),
    depositMoney: new DepositMoneyUseCase(repository),
    withdrawMoney: new WithdrawMoneyUseCase(repository),
    getAccountBalance: new GetAccountBalanceUseCase(repository),
  };
}
