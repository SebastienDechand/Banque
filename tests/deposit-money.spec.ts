import { DepositMoneyUseCase } from "../src/application/deposit-money.usecase";
import { InMemoryAccountRepository } from "../src/infrastructure/in-memory-account.repository";
import { AccountBuilder } from "./fixtures/account.builder";
import { createTestFixture } from "./fixtures/test.fixture";

describe("Deposit Money Use Case", () => {
  test("user should be able to deposit money into an account", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("1")
      .withOwnerName("John Doe")
      .build();
    const depositAmount = 1000;
    const { repository, createAccount, depositMoney } = createTestFixture(
      new InMemoryAccountRepository()
    );
    // Act
    createAccount.execute(account.id, account.ownerName);
    depositMoney.execute(account.id, depositAmount);
    // Assert
    const accountFromRepo = repository.getAccountById(account.id);
    expect(accountFromRepo).not.toBeNull();
    expect(accountFromRepo?.balance).toBe(depositAmount);
  });

  test("should throw an error when depositing to a non-existent account", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("non-existent-account")
      .withOwnerName("Jane Doe")
      .build();
    const depositAmount = 500;
    const repository = new InMemoryAccountRepository();
    const depositMoneyUseCase = new DepositMoneyUseCase(repository);
    // Act & Assert
    expect(() => {
      depositMoneyUseCase.execute(account.id, depositAmount);
    }).toThrow("Account not found");
  });
});
