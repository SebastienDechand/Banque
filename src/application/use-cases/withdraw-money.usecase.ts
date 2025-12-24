import { Inject, Injectable } from '@nestjs/common';
import {
  ACCOUNT_REPOSITORY,
  type AccountRepository,
} from '../../domain/account.repository.interface';

@Injectable()
export class WithdrawMoneyUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(accountId: string, amount: number): Promise<void> {
    const account = await this.accountRepository.getAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    account.withdraw(amount);
    await this.accountRepository.save(account);
  }
}
