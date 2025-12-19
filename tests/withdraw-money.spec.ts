import { WithdrawMoneyUseCase } from "../src/application/withdraw-money.usecase";
import { InMemoryAccountRepository } from "../src/infrastructure/in-memory-account.repository";
import { AccountBuilder } from "./fixtures/account.builder";
import { createTestFixture } from "./fixtures/test.fixture";

describe("Withdraw Money Use Case", () => {
  test("user withdraws money successfully", () => {
    // Arrange
    const userAccount = new AccountBuilder()
      .withAccountId("1")
      .withOwnerName("John Doe")
      .build();
    const initialDeposit = 1000;
    const withdrawAmount = 500;
    const { repository, createAccount, depositMoney, withdrawMoney } =
      createTestFixture(new InMemoryAccountRepository());
    // Act
    createAccount.execute(userAccount.id, userAccount.ownerName);
    depositMoney.execute(userAccount.id, initialDeposit);
    withdrawMoney.execute(userAccount.id, withdrawAmount);
    // Assert
    const account = repository.getAccountById(userAccount.id);
    expect(account).not.toBeNull();
    expect(account?.balance).toBe(initialDeposit - withdrawAmount);
  });

  test("should throw an error when withdrawing from a non-existent account", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("non-existent-account")
      .withOwnerName("Jane Doe")
      .build();
    const accountId = account.id;
    const withdrawAmount = 500;
    const repository = new InMemoryAccountRepository();
    const withdrawMoneyUseCase = new WithdrawMoneyUseCase(repository);
    // Act & Assert
    expect(() => {
      withdrawMoneyUseCase.execute(accountId, withdrawAmount);
    }).toThrow("Account not found");
  });
});
