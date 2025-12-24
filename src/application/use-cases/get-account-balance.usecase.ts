import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import {
  ACCOUNT_REPOSITORY,
  type AccountRepository,
} from '../../domain/account.repository.interface';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

@Injectable()
export class GetAccountBalanceUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(accountId: string): Promise<number> {
    const account = await this.accountRepository.getAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account.balance;
  }
}
