import * as fs from 'fs';
import { JsonFileAccountRepository } from '../../../src/infrastructure/persistence/json-file/json-file-account.repository';
import { AccountBuilder } from '../../fixtures/account.builder';

describe('JsonFileAccountRepository', () => {
  const TEST_FILE_PATH = 'test-accounts.json';

  // Clean up the test file before each test
  beforeEach(() => {
    if (fs.existsSync(TEST_FILE_PATH)) {
      fs.unlinkSync(TEST_FILE_PATH);
    }
  });

  // Clean up the test file after each test
  afterEach(() => {
    if (fs.existsSync(TEST_FILE_PATH)) {
      fs.unlinkSync(TEST_FILE_PATH);
    }
  });

  test('should save and retrieve an account', async () => {
    // Arrange
    const repository = new JsonFileAccountRepository(TEST_FILE_PATH);
    const account = new AccountBuilder()
      .withAccountId('1')
      .withOwnerName('Alice')
      .withInitialBalance(100)
      .build();
    await repository.save(account);
    // Act
    const retrievedAccount = await repository.getAccountById('1');
    // Assert
    expect(retrievedAccount).not.toBeNull();
    expect(retrievedAccount?.ownerName).toBe('Alice');
    expect(retrievedAccount?.balance).toBe(100);
  });

  test('should persist accounts to file', async () => {
    // Arrange
    const repository = new JsonFileAccountRepository(TEST_FILE_PATH);
    const account = new AccountBuilder()
      .withAccountId('2')
      .withOwnerName('Bob')
      .withInitialBalance(500)
      .build();
    await repository.save(account);
    // Act
    const newRepositoryInstance = new JsonFileAccountRepository(TEST_FILE_PATH);
    const retrievedAccount = await newRepositoryInstance.getAccountById('2');
    // Assert
    expect(retrievedAccount).not.toBeNull();
    expect(retrievedAccount?.ownerName).toBe('Bob');
  });
});
