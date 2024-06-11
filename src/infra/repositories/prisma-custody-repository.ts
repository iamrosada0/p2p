/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../database/prisma/prisma';
import { CustodyRepository } from '../../application';

export class PrismaCustodyRepository implements CustodyRepository {
  async retainFunds(userId: string, amount: number, walletId: string, cryptoType: string): Promise<void> {
    // Check if the user with the specified userId exists
    const user = await prisma.user.findUnique({ where: { uuid: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    // Check if the wallet with the specified walletId exists
    const wallet = await prisma.wallet.findUnique({ where: { uuid: walletId } });
    if (!wallet) {
      throw new Error(`Wallet with ID ${walletId} does not exist`);
    }

    // Proceed with creating the retainedFunds record
    try {
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
    } catch (error: any) {
      throw new Error(`Failed to retain funds: ${error.message}`);
    }
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
