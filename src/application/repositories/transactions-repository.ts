import { TransactionEntity } from '../../domain/transaction/entity/transactions';

export interface TransactionRepository {
  transaction(transaction: TransactionEntity): Promise<TransactionEntity>;
}
