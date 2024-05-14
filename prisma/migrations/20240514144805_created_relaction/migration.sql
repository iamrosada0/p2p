-- CreateTable
CREATE TABLE "RetainedFunds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "cryptoType" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    CONSTRAINT "RetainedFunds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RetainedFunds_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "privateKey" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "addressUserWallet" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wallet" ("addressUserWallet", "createdAt", "privateKey", "publicKey", "updatedAt", "userId", "uuid") SELECT "addressUserWallet", "createdAt", "privateKey", "publicKey", "updatedAt", "userId", "uuid" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
CREATE UNIQUE INDEX "Wallet_uuid_key" ON "Wallet"("uuid");
CREATE TABLE "new_Transaction" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "gas" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "gasprice" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("createdAt", "from", "gas", "gasprice", "nonce", "to", "updatedAt", "userId", "uuid", "value") SELECT "createdAt", "from", "gas", "gasprice", "nonce", "to", "updatedAt", "userId", "uuid", "value" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_uuid_key" ON "Transaction"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "RetainedFunds_id_key" ON "RetainedFunds"("id");
