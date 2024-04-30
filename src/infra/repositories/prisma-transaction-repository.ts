/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionRepository } from '../../application/repositories';
import { TransactionEntity } from '../../domain/transaction/entity/transactions';
import { prisma } from '../database/prisma/prisma';

export class PrismaTransactionRepository implements TransactionRepository {
  async transaction(transaction: TransactionEntity): Promise<TransactionEntity> {
    const transactionCreated = await prisma.transaction.create({
      data: {
        uuid: transaction.uuid,
        from: transaction.addressUserWallet,
        useId: transaction.userId,
        value: transaction.value as string,
        to: transaction.recipientAddress,
        gasprice: String(transaction.gasPrice),
        gas: String(transaction.gasPrice),
        nonce: String(transaction.nonce),
        updatedAt: String(transaction.updatedAt),
        createdAt: String(transaction.createdAt),
      },
    });

    return transactionCreated as any;
  }
}
