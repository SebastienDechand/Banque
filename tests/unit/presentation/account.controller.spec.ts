import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../../../src/presentation/controllers/account.controller';
import { CreateAccountUseCase } from '../../../src/application/use-cases/create-account.usecase';
import { DepositMoneyUseCase } from '../../../src/application/use-cases/deposit-money.usecase';
import { WithdrawMoneyUseCase } from '../../../src/application/use-cases/withdraw-money.usecase';
import { GetAccountBalanceUseCase } from '../../../src/application/use-cases/get-account-balance.usecase';
import { ACCOUNT_REPOSITORY } from '../../../src/domain/account.repository.interface';
import { InMemoryAccountRepository } from '../../../src/infrastructure/persistence/in-memory/in-memory-account.repository';

describe('AccountController', () => {
  let controller: AccountController;
  let createAccountUseCase: CreateAccountUseCase;
  let depositMoneyUseCase: DepositMoneyUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        CreateAccountUseCase,
        DepositMoneyUseCase,
        WithdrawMoneyUseCase,
        GetAccountBalanceUseCase,
        {
          provide: ACCOUNT_REPOSITORY,
          useClass: InMemoryAccountRepository,
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    createAccountUseCase =
      module.get<CreateAccountUseCase>(CreateAccountUseCase);
    depositMoneyUseCase = module.get<DepositMoneyUseCase>(DepositMoneyUseCase);
  });

  it('should create an account', async () => {
    await controller.createAccount({ id: '1', ownerName: 'Alice' });

    const balance = await controller.getAccountBalance('1');
    expect(balance.balance).toBe(0);
  });

  it('should deposit money', async () => {
    await createAccountUseCase.execute('1', 'Alice');
    await controller.depositMoney('1', { amount: 1000 });

    const balance = await controller.getAccountBalance('1');
    expect(balance.balance).toBe(1000);
  });
});
