import { Account } from "../../src/domain/account";

export class AccountBuilder {
  private accountId: string = "default-id";
  private ownerName: string = "Default Owner";
  private initialBalance: number = 0;

  withAccountId(accountId: string): AccountBuilder {
    this.accountId = accountId;
    return this;
  }

  withOwnerName(ownerName: string): AccountBuilder {
    this.ownerName = ownerName;
    return this;
  }

  withInitialBalance(initialBalance: number): AccountBuilder {
    this.initialBalance = initialBalance;
    return this;
  }

  build() {
    return new Account(this.accountId, this.ownerName, this.initialBalance);
  }
}
