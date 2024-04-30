-- CreateTable
CREATE TABLE "Wallet" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "privateKey" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "addressUserWallet" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_uuid_key" ON "Wallet"("uuid");
