import type { Account } from "./account";

export interface AccountRepository {
  save(account: Account): void;
  getAllAccounts(): Account[];
  getAccountById(id: string): Account | null;
  deleteAccount(id: string): void;
}
