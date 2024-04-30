import { TransactionValue } from '../../../domain/transaction/value/wallet-value';
import { TransactionRepository } from '../../repositories';

export class TransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public transaction = async (userId: string) => {
    const transactionValue = new TransactionValue(userId);

    const transactionProcessed = await this.transactionRepository.transaction(transactionValue);

    return transactionProcessed;
  };
}
