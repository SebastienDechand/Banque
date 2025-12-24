import { GetAccountBalanceUseCase } from '../../../src/application/use-cases/get-account-balance.usecase';
import { InMemoryAccountRepository } from '../../../src/infrastructure/persistence/in-memory/in-memory-account.repository';
import { AccountBuilder } from '../../fixtures/account.builder';
import { createTestFixture } from '../../fixtures/test.fixture';

describe('Get Account Balance Use Case', () => {
  test('should retrieve the correct account balance', async () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId('1')
      .withOwnerName('John Doe')
      .build();
    const initialDeposit = 1000;
    const { createAccount, depositMoney, getAccountBalance } =
      createTestFixture(new InMemoryAccountRepository());
    // Act
    await createAccount.execute(account.id, account.ownerName);
    await depositMoney.execute(account.id, initialDeposit);
    const balance = await getAccountBalance.execute(account.id);
    // Assert
    expect(balance).toBe(initialDeposit);
  });

  test('should throw an error if account does not exist', async () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId('non-existent-account')
      .build();
    const repository = new InMemoryAccountRepository();
    const getAccountBalanceUseCase = new GetAccountBalanceUseCase(repository);
    // Act & Assert
    await expect(async () => {
      await getAccountBalanceUseCase.execute(account.id);
    }).rejects.toThrow('Account not found');
  });
});
