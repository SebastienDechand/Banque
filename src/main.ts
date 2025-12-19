import { createTestFixture } from "../tests/fixtures/test.fixture";
import { JsonFileAccountRepository } from "./infrastructure/json-file-account.repository";

// Initialisation
const { createAccount, depositMoney, withdrawMoney, getAccountBalance } =
  createTestFixture(new JsonFileAccountRepository("accounts.json"));

// Scénario
console.log("🏦 Bienvenue à la banque !\n");

// Créer un compte
console.log("📝 Création du compte d'Alice...");
createAccount.execute("1", "Alice");
console.log("✅ Compte créé avec succès !");

// Déposer de l'argent
console.log("💰 Dépôt de 116876€...");
depositMoney.execute("1", 116876);
console.log("✅ Dépôt effectué avec succès !");

// Retirer de l'argent
console.log("💸 Retrait de 8563€...");
withdrawMoney.execute("1", 8563);
console.log("✅ Retrait effectué avec succès !");

// Vérifier le solde
console.log("📊 Récupération du solde du compte...");
const balance = getAccountBalance.execute("1");
console.log(`\n✅ Solde final d'Alice : ${balance}€`);

console.log("\n📁 Regarde le fichier accounts.json !");
