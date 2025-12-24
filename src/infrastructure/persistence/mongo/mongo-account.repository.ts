import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../../../domain/account.entity';
import { AccountRepository } from '../../../domain/account.repository.interface';
import { AccountDocument } from './account.schema';

@Injectable()
export class MongoAccountRepository implements AccountRepository {
  constructor(
    @InjectModel(AccountDocument.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async save(account: Account): Promise<void> {
    const existingAccount = await this.accountModel.findOne({ id: account.id });

    if (existingAccount) {
      await this.accountModel.updateOne(
        { id: account.id },
        {
          ownerName: account.ownerName,
          balance: account.balance,
        },
      );
    } else {
      const newAccount = new this.accountModel({
        id: account.id,
        ownerName: account.ownerName,
        balance: account.balance,
      });
      await newAccount.save();
    }
  }

  async getAllAccounts(): Promise<Account[]> {
    const documents = await this.accountModel.find().exec();
    return documents.map(this.toDomain);
  }

  async getAccountById(id: string): Promise<Account | null> {
    const document = await this.accountModel.findOne({ id }).exec();
    return document ? this.toDomain(document) : null;
  }

  async deleteAccount(id: string): Promise<void> {
    await this.accountModel.deleteOne({ id }).exec();
  }

  private toDomain(document: AccountDocument): Account {
    return new Account(document.id, document.ownerName, document.balance);
  }
}
