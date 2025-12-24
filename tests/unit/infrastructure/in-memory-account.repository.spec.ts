import { InMemoryAccountRepository } from '../../../src/infrastructure/persistence/in-memory/in-memory-account.repository';
import { AccountBuilder } from '../../fixtures/account.builder';

describe('InMemoryAccountRepository', () => {
  test('should save and retrieve accounts', async () => {
    // Arrange
    const repository = new InMemoryAccountRepository();
    const account = new AccountBuilder()
      .withAccountId('1')
      .withOwnerName('Alice')
      .build();
    await repository.save(account);
    // Act
    const allAccounts = await repository.getAllAccounts();
    // Assert
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0]?.ownerName).toBe('Alice');
  });

  test('should update existing account on save', async () => {
    // Arrange
    const repository = new InMemoryAccountRepository();
    const account = new AccountBuilder()
      .withAccountId('2')
      .withOwnerName('Bob')
      .build();
    await repository.save(account);
    // Act
    account.deposit(500);
    await repository.save(account);
    // Assert
    const allAccounts = await repository.getAllAccounts();
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0]?.balance).toBe(500);
  });
});
