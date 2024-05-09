/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { TransactionValue } from '../../../domain/transaction/value/transaction-value';
import { TransactionRepository, WalletRepository } from '../../repositories';

export class TransactionUseCase {
  private readonly web3: Web3;
  private nonce: number | undefined; // Define nonce property

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletRepository: WalletRepository,
    infuraProjectId: string,
  ) {
    // Initialize Web3 with the Infura endpoint
    this.web3 = new Web3(`https://holesky.infura.io/v3/${infuraProjectId}`);
  }

  public transaction = async (userId: string, toAddress: string, amountInEther: number) => {
    // Fetch user wallet details
    const detailUserWallet = await this.walletRepository.findDetailWalletByUserId(userId);

    // Create TransactionValue object
    const transactionValue = new TransactionValue(
      userId,
      toAddress,
      amountInEther,
      this.web3,
      detailUserWallet?.privateKey,
      detailUserWallet?.publicKey,
      detailUserWallet?.addressUserWallet,
    );

    console.log({ transactionValue }, '----?>DEUS');

    try {
      // Fetch nonce and set it
      this.nonce = await this.fetchNonce(detailUserWallet?.addressUserWallet);

      // Increase the gas price to ensure it's higher than the base fee
      const transactionObject = {
        from: detailUserWallet?.addressUserWallet,
        to: transactionValue.recipientAddress,
        value: transactionValue.value, // Use the amount in Wei from TransactionValue
        gas: this.web3.utils.toHex(transactionValue.gasLimit), // Convert gas limit to hexadecimal
        gasPrice: this.web3.utils.toHex(await this.web3.eth.getGasPrice()), // Convert gas price to hexadecimal
        nonce: this.web3.utils.toHex(this.nonce), // Convert nonce to hexadecimal
      };

      // Adjust gas price to be higher than the base fee
      transactionObject.gasPrice = this.web3.utils.toHex(await this.web3.eth.getGasPrice());

      // Sign the transaction
      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        transactionObject,
        transactionValue.privateKey,
      );

      // Send the signed transaction to the network
      await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

      // Save the transaction details to the repository
      const transactionValueCopy = { ...transactionValue };

      // Add nonce to the copy and convert it to hexadecimal
      transactionValueCopy.nonce = Number(this.web3.utils.toHex(this.nonce));

      const transactionProcessedSuccessful = await this.transactionRepository.transaction(transactionValueCopy);

      return transactionProcessedSuccessful;
    } catch (error: any) {
      console.error('Error while sending transaction:', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };

  private async fetchNonce(addressUserWallet: string | undefined): Promise<number> {
    if (!addressUserWallet) {
      throw new Error('Sender address is undefined');
    }

    try {
      const nonce = await this.web3.eth.getTransactionCount(addressUserWallet, 'pending');
      return Number(nonce);
    } catch (error: any) {
      throw new Error('Error fetching nonce: ' + error.message);
    }
  }
}
