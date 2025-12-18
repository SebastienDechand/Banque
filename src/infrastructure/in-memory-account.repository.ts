import { Account } from "../domain/account";
import type { AccountRepository } from "../domain/account.repository";

export class InMemoryAccountRepository implements AccountRepository {
  private accounts: Account[] = [];

  save(account: Account): void {
    const index = this.accounts.findIndex((acc) => acc.id === account.id);
    if (index !== -1) {
      this.accounts[index] = account;
    } else {
      this.accounts.push(account);
    }
  }

  getAllAccounts(): Account[] {
    return this.accounts;
  }

  getAccountById(id: string): Account | null {
    const account = this.accounts.find((account) => account.id === id);
    return account || null;
  }

  deleteAccount(id: string): void {
    this.accounts = this.accounts.filter((account) => account.id !== id);
  }
}
