import * as fs from 'fs';
import { AccountBuilder } from '../fixtures/account.builder';
import { JsonFileAccountRepository } from '../../src/infrastructure/persistence/json-file/json-file-account.repository';
import { createTestFixture } from '../fixtures/test.fixture';

describe('Bank Account Integration', () => {
  const testFile = 'integration-test-accounts.json';

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  test('should create an account, deposit money, withdraw money, and retrieve the correct balance', async () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId('1')
      .withOwnerName('Jane Doe')
      .build();
    const deposit = 1000;
    const withdrawal = 700;
    const { createAccount, depositMoney, withdrawMoney, getAccountBalance } =
      createTestFixture(new JsonFileAccountRepository(testFile));
    // Act
    await createAccount.execute(account.id, account.ownerName);
    await depositMoney.execute(account.id, deposit);
    await withdrawMoney.execute(account.id, withdrawal);
    const balance = await getAccountBalance.execute(account.id);
    // Assert
    expect(balance).toBe(deposit - withdrawal);
  });
});
