import { TransactionValue } from '../../../domain/transaction/value/transaction-value';
import { TransactionRepository } from '../../repositories';

export class TransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public transaction = async (userId: string) => {
    const transactionValue = new TransactionValue(userId);

    const transactionProcessed = await this.transactionRepository.transaction(transactionValue);

    return transactionProcessed;
  };

  public signTransaction(web3: Web3, toAddress: string, amountInEther: number): string {
    const transactionObject = {
      from: this.addressUserWallet,
      to: toAddress,
      value: web3.utils.toWei(amountInEther.toString(), 'ether'),
      gas: this.gasLimit,
      gasPrice: this.gasPrice,
      nonce: this.nonce,
    };

    const signedTransaction = web3.eth.accounts.signTransaction(transactionObject, this.privateKey);
    return signedTransaction.rawTransaction!;
  }
}
