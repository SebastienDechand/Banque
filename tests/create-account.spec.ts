import { InMemoryAccountRepository } from "../src/infrastructure/in-memory-account.repository";
import { AccountBuilder } from "./fixtures/account.builder";
import { createTestFixture } from "./fixtures/test.fixture";

describe("Create Account Use Case", () => {
  test("user should be able to create an account", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("1")
      .withOwnerName("John Doe")
      .build();
    const { repository, createAccount } = createTestFixture(
      new InMemoryAccountRepository()
    );
    // Act
    createAccount.execute(account.id, account.ownerName);
    // Assert
    const allAccounts = repository.getAllAccounts();
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0]?.ownerName).toBe(account.ownerName);
  });
});
