/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionRepository } from '../../application/repositories';
import { TransactionEntity } from '../../domain/transaction/entity/transactions';
import { prisma } from '../database/prisma/prisma';

export class PrismaTransactionRepository implements TransactionRepository {
  async checkForNewTransactions(userId: string): Promise<TransactionEntity[] | any> {
    const newTransactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
    });

    return newTransactions;
  }
  async transaction(transaction: TransactionEntity): Promise<TransactionEntity> {
    console.log(transaction, 'transaction-->DEUS-1');
    const transactionCreated = await prisma.transaction.create({
      data: {
        uuid: transaction.uuid, // Ensure uuid is provided
        from: transaction.addressUserWallet,
        userId: transaction.userId,
        value: transaction.value, // No need to cast value to string
        to: transaction.recipientAddress,
        gasprice: transaction?.gasPrice?.toString(), // Ensure gasPrice is provided and cast to string
        gas: transaction?.gasLimit?.toString(), // Ensure gasLimit is provided and cast to string
        nonce: transaction?.nonce?.toString(), // Ensure nonce is provided and cast to string
        updatedAt: transaction?.updatedAt?.toString() as unknown as string, // Ensure updatedAt is provided
        createdAt: transaction?.createdAt?.toString() as unknown as string, // Ensure createdAt is provided
      },
    });
    const transactionData: TransactionEntity = {
      uuid: transactionCreated.uuid,
      recipientAddress: transactionCreated.from,
      gasLimit: transactionCreated.gasprice as unknown as number,
      gasPrice: transactionCreated.gasprice as unknown as number,
      nonce: transactionCreated.nonce as unknown as number,
      value: transactionCreated.value,
      privateKey: '',
      publicKey: '',
      addressUserWallet: '',
      userId: transactionCreated.userId,
    };

    return transactionData;
  }
}