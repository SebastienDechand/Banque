import * as fs from "fs";
import type { AccountRepository } from "../domain/account.repository";
import { Account } from "../domain/account";

export class JsonFileAccountRepository implements AccountRepository {
  private filePath: string;

  constructor(filePath: string = "accounts.json") {
    this.filePath = filePath;
  }

  save(account: Account): void {
    const accounts = this.readFile();
    const index = accounts.findIndex((acc) => acc.id === account.id);
    if (index !== -1) {
      accounts[index] = account;
    } else {
      accounts.push(account);
    }
    this.writeFile(accounts);
  }

  getAllAccounts(): Account[] {
    return this.readFile();
  }

  getAccountById(id: string): Account | null {
    const accounts = this.readFile();
    const account = accounts.find((acc) => acc.id === id);
    return account || null;
  }

  deleteAccount(id: string): void {
    const accounts = this.readFile();
    const filteredAccounts = accounts.filter((acc) => acc.id !== id);
    this.writeFile(filteredAccounts);
  }

  private readFile(): Account[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }

    const data = fs.readFileSync(this.filePath, "utf-8");
    const rawAccounts = JSON.parse(data);

    return rawAccounts.map(
      (rawAccount: any) =>
        new Account(rawAccount.id, rawAccount.ownerName, rawAccount.balance)
    );
  }

  private writeFile(accounts: Account[]): void {
    const data = JSON.stringify(accounts, null, 2);
    fs.writeFileSync(this.filePath, data, "utf-8");
  }
}
