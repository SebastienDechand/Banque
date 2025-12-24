export class Account {
  public id: string;
  public ownerName: string;
  public balance: number;

  constructor(id: string, ownerName: string, balance: number = 0) {
    if (!ownerName.trim()) {
      throw new Error('Owner name cannot be empty');
    }

    this.id = id;
    this.ownerName = ownerName;
    this.balance = balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('Withdraw amount must be positive');
    }
    if (this.balance < amount) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }
}
