import { Account } from "../domain/account";
import type { AccountRepository } from "../domain/account.repository";

export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  execute(id: string, ownerName: string): void {
    const account = new Account(id, ownerName);
    this.accountRepository.save(account);
  }
}
