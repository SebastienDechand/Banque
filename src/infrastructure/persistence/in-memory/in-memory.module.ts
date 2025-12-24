import { Module } from '@nestjs/common';
import { ACCOUNT_REPOSITORY } from 'src/domain/account.repository.interface';
import { InMemoryAccountRepository } from './in-memory-account.repository';

@Module({
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: InMemoryAccountRepository,
    },
  ],
  exports: [ACCOUNT_REPOSITORY],
})
export class InMemoryModule {}
