-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
