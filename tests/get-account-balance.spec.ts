import { GetAccountBalanceUseCase } from "../src/application/get-account-balance.usecase";
import { InMemoryAccountRepository } from "../src/infrastructure/in-memory-account.repository";
import { AccountBuilder } from "./fixtures/account.builder";
import { createTestFixture } from "./fixtures/test.fixture";

describe("Get Account Balance Use Case", () => {
  test("should retrieve the correct account balance", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("1")
      .withOwnerName("John Doe")
      .build();
    const initialDeposit = 1000;
    const { createAccount, depositMoney, getAccountBalance } =
      createTestFixture();
    // Act
    createAccount.execute(account.id, account.ownerName);
    depositMoney.execute(account.id, initialDeposit);
    const balance = getAccountBalance.execute(account.id);
    // Assert
    expect(balance).toBe(initialDeposit);
  });

  test("should throw an error if account does not exist", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("non-existent-account")
      .build();
    const repository = new InMemoryAccountRepository();
    const getAccountBalanceUseCase = new GetAccountBalanceUseCase(repository);
    // Act & Assert
    expect(() => {
      getAccountBalanceUseCase.execute(account.id);
    }).toThrow("Account not found");
  });
});
