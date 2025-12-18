import { Account } from "../src/domain/account";
import { AccountBuilder } from "./fixtures/account.builder";

describe("Account Class", () => {
  test("account should have an owner", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("1")
      .withOwnerName("John Doe")
      .build();
    // Act & Assert
    expect(account.ownerName).toBe("John Doe");
  });

  test("ownerName should not be empty", () => {
    // Act & Assert
    expect(() => {
      new AccountBuilder().withAccountId("1").withOwnerName("").build();
    }).toThrow("Owner name cannot be empty");
  });

  test("ownerName should not be space only", () => {
    // Act & Assert
    expect(() => {
      new AccountBuilder().withAccountId("1").withOwnerName("   ").build();
    }).toThrow("Owner name cannot be empty");
  });

  test("should initialize with zero balance if not provided", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("2")
      .withOwnerName("Jane Doe")
      .build();
    // Act & Assert
    expect(account.balance).toBe(0);
  });

  test("should set the balance if provided", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("3")
      .withOwnerName("Alice")
      .withInitialBalance(500)
      .build();
    // Act & Assert
    expect(account.balance).toBe(500);
  });

  test("should deposit money correctly", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("4")
      .withOwnerName("Bob")
      .build();
    // Act
    account.deposit(200);
    // Assert
    expect(account.balance).toBe(200);
  });

  test("should not allow depositing zero", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("5")
      .withOwnerName("Charlie")
      .build();
    // Act & Assert
    expect(() => {
      account.deposit(0);
    }).toThrow("Deposit amount must be positive");
  });

  test("should not allow depositing negative amount", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("6")
      .withOwnerName("David")
      .build();
    // Act & Assert
    expect(() => {
      account.deposit(-100);
    }).toThrow("Deposit amount must be positive");
  });

  test("should withdraw money correctly", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("7")
      .withOwnerName("Eve")
      .withInitialBalance(500)
      .build();
    // Act
    account.withdraw(200);
    // Assert
    expect(account.balance).toBe(300);
  });

  test("should not allow withdrawing zero", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("8")
      .withOwnerName("Frank")
      .withInitialBalance(500)
      .build();
    // Act & Assert
    expect(() => {
      account.withdraw(0);
    }).toThrow("Withdraw amount must be positive");
  });

  test("should not allow withdrawing negative amount", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("9")
      .withOwnerName("Grace")
      .withInitialBalance(500)
      .build();
    // Act & Assert
    expect(() => {
      account.withdraw(-100);
    }).toThrow("Withdraw amount must be positive");
  });

  test("should not allow withdrawing more than the balance", () => {
    // Arrange
    const account = new AccountBuilder()
      .withAccountId("10")
      .withOwnerName("Hank")
      .withInitialBalance(300)
      .build();
    // Act & Assert
    expect(() => {
      account.withdraw(400);
    }).toThrow("Insufficient funds");
  });
});
