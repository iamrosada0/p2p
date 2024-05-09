import { TransactionReceipt } from 'web3';
import { TransactionEntity } from '../../domain/transaction/entity/transactions';

export interface TransactionRepository {
  transaction(transaction: TransactionEntity | TransactionReceipt): Promise<TransactionEntity | TransactionReceipt>;
  checkForNewTransactions(userId: string): Promise<TransactionEntity[]>;
}
