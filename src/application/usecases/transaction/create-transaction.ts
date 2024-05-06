import { TransactionValue } from '../../../domain/transaction/value/transaction-value';
import { TransactionRepository, WalletRepository } from '../../repositories';
import Web3 from 'web3';

export class TransactionUseCase {
  private readonly web3: Web3;

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletRepository: WalletRepository,
    infuraProjectId: string,
  ) {
    this.web3 = new Web3(`https://mainnet.infura.io/v3/${infuraProjectId}`);
  }

  public transaction = async (userId: string, toAddress: string, amountInEther: number) => {
    const detailUserWallet = await this.walletRepository.findDetailWalletByUserId(userId);

    const transactionValue = new TransactionValue(
      userId,
      toAddress,
      amountInEther,
      this.web3,
      detailUserWallet?.privateKey,
      detailUserWallet?.publicKey,
      detailUserWallet?.addressUserWallet,
    );

    // Construct the transaction object
    const transactionObject = {
      from: detailUserWallet?.addressUserWallet,
      to: transactionValue.recipientAddress,
      value: transactionValue.value, // Use the amount in Wei from TransactionValue
      gas: this.web3.utils.toHex(transactionValue.gasLimit), // Convert gas limit to hexadecimal
      gasPrice: this.web3.utils.toHex(transactionValue.gasPrice), // Convert gas price to hexadecimal
      nonce: this.web3.utils.toHex(transactionValue.nonce), // Convert nonce to hexadecimal
    };

    const subscription = await this.web3.eth.subscribe('pendingTransactions');

    subscription.on('data', async (transactionHash: string) => {
      try {
        const transaction = await this.web3.eth.getTransaction(transactionHash);
        if (
          transaction &&
          transaction.to &&
          transaction.to.toLowerCase() === detailUserWallet?.addressUserWallet?.toLowerCase()
        ) {
          console.log('Usuário recebeu uma nova transação:', transaction);
          // Aqui você pode notificar o usuário ou realizar outras ações necessárias
        }
      } catch (error) {
        console.error('Erro ao obter detalhes da transação:', error);
      }
    });

    // Sign the transaction
    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transactionObject,
      transactionValue.privateKey,
    );

    // Send the signed transaction to the network
    const transactionProcessed = await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    // Save the transaction details to the repository
    const transactionProcessedSuccessful = await this.transactionRepository.transaction(transactionProcessed);

    return transactionProcessedSuccessful;
  };
}
