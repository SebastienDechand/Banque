import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../../domain/account.entity';
import {
  type AccountRepository,
  ACCOUNT_REPOSITORY,
} from '../../domain/account.repository.interface';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: AccountRepository,
  ) {}

  async execute(id: string, ownerName: string): Promise<void> {
    const account = new Account(id, ownerName);
    await this.accountRepository.save(account);
  }
}
