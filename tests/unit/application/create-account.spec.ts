import { InMemoryAccountRepository } from '../../../src/infrastructure/persistence/in-memory/in-memory-account.repository';
import { AccountBuilder } from '../../fixtures/account.builder';
import { createTestFixture } from '../../fixtures/test.fixture';

describe('Create Account Use Case', () => {
  test('user should be able to create an account', async () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId('1')
      .withOwnerName('John Doe')
      .build();
    const { repository, createAccount } = createTestFixture(
      new InMemoryAccountRepository(),
    );
    // Act
    await createAccount.execute(account.id, account.ownerName);
    // Assert
    const allAccounts = await repository.getAllAccounts();
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0]?.ownerName).toBe(account.ownerName);
  });
});
