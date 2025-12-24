import { Injectable } from '@nestjs/common';
import { Account } from '../../../domain/account.entity';
import type { AccountRepository } from '../../../domain/account.repository.interface';

@Injectable()
export class InMemoryAccountRepository implements AccountRepository {
  private accounts: Account[] = [];

  async save(account: Account): Promise<void> {
    const index = this.accounts.findIndex((acc) => acc.id === account.id);
    if (index !== -1) {
      this.accounts[index] = account;
    } else {
      this.accounts.push(account);
    }
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.accounts;
  }

  async getAccountById(id: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account.id === id);
    return account || null;
  }

  async deleteAccount(id: string): Promise<void> {
    this.accounts = this.accounts.filter((account) => account.id !== id);
  }
}
