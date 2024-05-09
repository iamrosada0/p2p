-- CreateTable
CREATE TABLE "Transaction" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "useId" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "gas" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "gasprice" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_uuid_key" ON "Transaction"("uuid");
