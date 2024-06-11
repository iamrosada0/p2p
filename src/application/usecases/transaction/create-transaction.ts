/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { TransactionValue } from '../../../domain/transaction/value/transaction-value';
import { TransactionRepository, WalletRepository, CustodyRepository } from '../../repositories';
import { CustodyUseCase } from '../..';

export class TransactionUseCase {
  private readonly web3: Web3;
  private nonce: number | undefined;

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletRepository: WalletRepository,
    private readonly custodyRepository: CustodyRepository,
    private custodyUseCase: CustodyUseCase,
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
    await this.custodyUseCase.retainFunds(userId, amountInEther, detailUserWallet.uuid, 'ETH');

    try {
      // Check if the transaction is transferring funds to the user's own wallet
      const isDeposit = toAddress === detailUserWallet.addressUserWallet;

      // Transfer funds to custody if it's not a deposit
      if (!isDeposit) {
        await this.transferToCustody(userId, amountInEther, detailUserWallet);
      }

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

      // If it's a deposit, no need to call custody repository
      if (isDeposit) {
        return true;
      }

      // If it's a withdrawal, release funds from custody
      await this.custodyRepository.releaseFunds(userId, amountInEther, detailUserWallet.uuid, 'ETH', toAddress);

      const transactionValueCopy = { ...transactionValue };
      transactionValueCopy.nonce = Number(this.nonce);

      const transactionProcessedSuccessful = await this.transactionRepository.transaction(transactionValueCopy);

      return transactionProcessedSuccessful;
    } catch (error: any) {
      console.error('Error while sending transaction:', error);
      throw error;
    }
  }

  private async transferToCustody(userId: string, amountInEther: number, userWallet: any) {
    // Recupere o endereço da carteira de custódia da instância de CustodyRepository
    const custodyWalletAddress = '';

    // Crie um novo objeto de valor de transação para a carteira de custódia
    const custodyTransactionValue = new TransactionValue(
      userId,
      custodyWalletAddress,
      amountInEther,
      this.web3,
      userWallet.privateKey, // Use a chave privada da carteira do usuário
      userWallet.publicKey, // Use a chave pública da carteira do usuário
      userWallet.addressUserWallet, // Use o endereço da carteira do usuário como remetente
    );

    try {
      // Obtenha o nonce para a carteira do usuário
      const nonce = await this.fetchNonce(userWallet.addressUserWallet);

      // Construa o objeto de transação para a transferência para a carteira de custódia
      const custodyTransactionObject = {
        from: userWallet.addressUserWallet,
        to: custodyTransactionValue.to,
        value: custodyTransactionValue.value,
        gas: this.web3.utils.toHex(custodyTransactionValue.gas),
        gasPrice: this.web3.utils.toHex(await this.web3.eth.getGasPrice()),
        nonce: this.web3.utils.toHex(nonce),
      };

      // Assine a transação com a chave privada da carteira do usuário
      const signedCustodyTransaction = await this.web3.eth.accounts.signTransaction(
        custodyTransactionObject,
        userWallet.privateKey,
      );

      // Envie a transação assinada para a rede Ethereum
      await this.web3.eth.sendSignedTransaction(signedCustodyTransaction.rawTransaction);

      // Registro da transferência para a carteira de custódia
      console.log(`Funds transferred to custody wallet: ${amountInEther} ETH`);
    } catch (error: any) {
      console.error('Error transferring funds to custody:', error);
      throw new Error('Failed to transfer funds to custody');
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
