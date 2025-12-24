import type { Account } from './account.entity';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  getAllAccounts(): Promise<Account[]>;
  getAccountById(id: string): Promise<Account | null>;
  deleteAccount(id: string): Promise<void>;
}

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';
