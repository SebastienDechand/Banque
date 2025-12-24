import { DepositMoneyUseCase } from '../../../src/application/use-cases/deposit-money.usecase';
import { InMemoryAccountRepository } from '../../../src/infrastructure/persistence/in-memory/in-memory-account.repository';
import { AccountBuilder } from '../../fixtures/account.builder';
import { createTestFixture } from '../../fixtures/test.fixture';

describe('Deposit Money Use Case', () => {
  test('user should be able to deposit money into an account', async () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId('1')
      .withOwnerName('John Doe')
      .build();
    const depositAmount = 1000;
    const { repository, createAccount, depositMoney } = createTestFixture(
      new InMemoryAccountRepository(),
    );
    // Act
    await createAccount.execute(account.id, account.ownerName);
    await depositMoney.execute(account.id, depositAmount);
    // Assert
    const accountFromRepo = await repository.getAccountById(account.id);
    expect(accountFromRepo).not.toBeNull();
    expect(accountFromRepo?.balance).toBe(depositAmount);
  });

  test('should throw an error when depositing to a non-existent account', async () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId('non-existent-account')
      .withOwnerName('Jane Doe')
      .build();
    const depositAmount = 500;
    const repository = new InMemoryAccountRepository();
    const depositMoneyUseCase = new DepositMoneyUseCase(repository);
    // Act & Assert
    await expect(async () => {
      await depositMoneyUseCase.execute(account.id, depositAmount);
    }).rejects.toThrow('Account not found');
  });
});
