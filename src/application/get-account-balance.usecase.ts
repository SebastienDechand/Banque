import type { AccountRepository } from "../domain/account.repository";

export class GetAccountBalanceUseCase {
  constructor(private accountRepository: AccountRepository) {}

  execute(accountId: string): number {
    const account = this.accountRepository.getAccountById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    return account.balance;
  }
}
