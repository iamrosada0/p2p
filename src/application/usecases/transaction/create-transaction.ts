/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { TransactionValue } from '../../../domain/transaction/value/transaction-value';
import { TransactionRepository, WalletRepository } from '../../repositories';

export class TransactionUseCase {
  private readonly web3: Web3;
  private nonce: number | undefined;

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletRepository: WalletRepository,
    infuraProjectId: string,
  ) {
    this.web3 = new Web3(`https://holesky.infura.io/v3/${infuraProjectId}`);
  }

  public async transaction(userId: string, toAddress: string, amountInEther: number) {
    const detailUserWallet = await this.walletRepository.findDetailWalletByUserId(userId);

    if (!detailUserWallet) {
      throw new Error('User wallet not found');
    }

    const transactionValue = new TransactionValue(
      userId,
      toAddress,
      amountInEther,
      this.web3,
      detailUserWallet.privateKey,
      detailUserWallet.publicKey,
      detailUserWallet.addressUserWallet,
    );

    try {
      this.nonce = await this.fetchNonce(detailUserWallet.addressUserWallet);
      const transactionObject = {
        from: detailUserWallet.addressUserWallet,
        to: transactionValue.to,
        value: transactionValue.value,
        gas: this.web3.utils.toHex(transactionValue.gas),
        gasPrice: this.web3.utils.toHex(await this.web3.eth.getGasPrice()),
        nonce: this.web3.utils.toHex(this.nonce),
      };

      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        transactionObject,
        detailUserWallet.privateKey,
      );

      await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

      const transactionValueCopy = { ...transactionValue };
      transactionValueCopy.nonce = Number(this.nonce);

      const transactionProcessedSuccessful = await this.transactionRepository.transaction(transactionValueCopy);

      return transactionProcessedSuccessful;
    } catch (error: any) {
      console.error('Error while sending transaction:', error);
      throw error;
    }
  }

  private async fetchNonce(addressUserWallet: string): Promise<number> {
    try {
      const nonce = await this.web3.eth.getTransactionCount(addressUserWallet, 'pending');
      return Number(nonce);
    } catch (error: any) {
      throw new Error('Error fetching nonce: ' + error.message);
    }
  }
}
