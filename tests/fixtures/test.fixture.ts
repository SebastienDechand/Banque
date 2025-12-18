import { CreateAccountUseCase } from "../../src/application/create-account.usecase";
import { DepositMoneyUseCase } from "../../src/application/deposit-money.usecase";
import { GetAccountBalanceUseCase } from "../../src/application/get-account-balance.usecase";
import { WithdrawMoneyUseCase } from "../../src/application/withdraw-money.usecase";
import { InMemoryAccountRepository } from "../../src/infrastructure/in-memory-account.repository";

export function createTestFixture() {
  const repository = new InMemoryAccountRepository();

  return {
    repository,
    createAccount: new CreateAccountUseCase(repository),
    depositMoney: new DepositMoneyUseCase(repository),
    withdrawMoney: new WithdrawMoneyUseCase(repository),
    getAccountBalance: new GetAccountBalanceUseCase(repository),
  };
}
