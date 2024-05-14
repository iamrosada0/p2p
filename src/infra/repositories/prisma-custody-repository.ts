import { prisma } from '../database/prisma/prisma';
import { CustodyRepository } from '../../application';

export class PrismaCustodyRepository implements CustodyRepository {
  async retainFunds(userId: string, amount: number, walletId: string, cryptoType: string): Promise<void> {
    await prisma.retainedFunds.create({
      data: {
        userId,
        walletId,
        amount,
        cryptoType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async releaseFunds(userId: string, amount: number, walletId: string, cryptoType: string): Promise<void> {
    const retainedFund = await prisma.retainedFunds.findFirst({
      where: {
        userId,
        walletId,
        cryptoType,
      },
    });

    if (!retainedFund || retainedFund.amount < amount) {
      throw new Error('Insufficient retained funds');
    }

    await prisma.retainedFunds.update({
      where: {
        id: retainedFund.id,
      },
      data: {
        amount: retainedFund.amount - amount,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async isFundsRetained(userId: string, amount: number, walletId: string, cryptoType: string): Promise<boolean> {
    const retainedFund = await prisma.retainedFunds.findFirst({
      where: {
        userId,
        walletId,
        cryptoType,
      },
    });

    return !!retainedFund && retainedFund.amount >= amount;
  }
}
