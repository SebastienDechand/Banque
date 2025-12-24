import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseConfig } from 'src/config/database.config';
import { AccountDocument, AccountSchema } from './account.schema';
import { ACCOUNT_REPOSITORY } from 'src/domain/account.repository.interface';
import { MongoAccountRepository } from './mongo-account.repository';

@Module({
  imports: [
    MongooseModule.forRoot(getDatabaseConfig().uri, {
      dbName: getDatabaseConfig().dbName,
    }),
    MongooseModule.forFeature([
      { name: AccountDocument.name, schema: AccountSchema },
    ]),
  ],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: MongoAccountRepository,
    },
  ],
  exports: [ACCOUNT_REPOSITORY],
})
export class MongoModule {}
