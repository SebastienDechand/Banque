import { AccountBuilder } from "./fixtures/account.builder";
import { createTestFixture } from "./fixtures/test.fixture";

describe("Bank Account Integration", () => {
  test("should create an account, deposit money, withdraw money, and retrieve the correct balance", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("1")
      .withOwnerName("Jane Doe")
      .build();
    const deposit = 1000;
    const withdrawal = 700;
    const { createAccount, depositMoney, withdrawMoney, getAccountBalance } =
      createTestFixture();
    // Act
    createAccount.execute(account.id, account.ownerName);
    depositMoney.execute(account.id, deposit);
    withdrawMoney.execute(account.id, withdrawal);
    const balance = getAccountBalance.execute(account.id);
    // Assert
    expect(balance).toBe(deposit - withdrawal);
  });
});
