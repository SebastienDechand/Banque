import type { AccountRepository } from "../domain/account.repository";

export class WithdrawMoneyUseCase {
  constructor(private accountRepository: AccountRepository) {}

  execute(accountId: string, amount: number): void {
    const account = this.accountRepository.getAccountById(accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    account.withdraw(amount);
    this.accountRepository.save(account);
  }
}
