import { InMemoryAccountRepository } from "../src/infrastructure/in-memory-account.repository";
import { AccountBuilder } from "./fixtures/account.builder";

describe("InMemoryAccountRepository", () => {
  test("should save and retrieve accounts", () => {
    // Arrange
    const repository = new InMemoryAccountRepository();
    const account = new AccountBuilder()
      .withAccountId("1")
      .withOwnerName("Alice")
      .build();
    repository.save(account);
    // Act
    const allAccounts = repository.getAllAccounts();
    // Assert
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0]?.ownerName).toBe("Alice");
  });

  test("should update existing account on save", () => {
    // Arrange
    const repository = new InMemoryAccountRepository();
    const account = new AccountBuilder()
      .withAccountId("2")
      .withOwnerName("Bob")
      .build();
    repository.save(account);
    // Act
    account.deposit(500);
    repository.save(account);
    // Assert
    const allAccounts = repository.getAllAccounts();
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0]?.balance).toBe(500);
  });
});
