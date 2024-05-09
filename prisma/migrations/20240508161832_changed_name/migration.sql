/*
  Warnings:

  - You are about to drop the column `useId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "updatedAt" TEXT NOT NULL
);
INSERT INTO "new_Transaction" ("createdAt", "from", "gas", "gasprice", "nonce", "to", "updatedAt", "uuid", "value") SELECT "createdAt", "from", "gas", "gasprice", "nonce", "to", "updatedAt", "uuid", "value" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_uuid_key" ON "Transaction"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
