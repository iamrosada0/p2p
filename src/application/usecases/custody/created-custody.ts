/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { TransactionValue, UserFundsInCustodyValue } from '../../../domain';
import { CustodyRepository, WalletRepository } from '../../repositories';

export class CustodyUseCase {
  private readonly web3: Web3;
  private nonce: number | undefined;

  private custodyWalletAddress: string; // Adicionando o endereço da carteira de custódia

  constructor(
    private readonly custodyRepository: CustodyRepository,
    private readonly walletRepository: WalletRepository,
    infuraProjectId: string,
    custodyWalletAddress: string, // Recebendo o endereço da carteira de custódia no construtor
  ) {
    this.web3 = new Web3(`https://holesky.infura.io/v3/${infuraProjectId}`);
    this.custodyWalletAddress = custodyWalletAddress; // Inicializando a carteira de custódia
  }

  // Retain funds from the user's wallet and transfer to custody
  public retainFunds = async (userId: string, amountInEther: number, walletId: string, cryptoType: string) => {
    const detailUserWallet = await this.walletRepository.findDetailWalletByUserId(userId);

    if (!detailUserWallet) {
      throw new Error('User wallet not found');
    }

    const transactionValue = new TransactionValue(
      userId,
      this.custodyWalletAddress,
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

      const userFundsInCustody = new UserFundsInCustodyValue(userId, amountInEther, cryptoType, walletId);

      await this.custodyRepository.retainFunds(
        userFundsInCustody.userId,
        userFundsInCustody.amount,
        userFundsInCustody.walletId,
        userFundsInCustody.cryptoType,
      );
    } catch (error: any) {
      console.error('Error while retaining funds:', error);
      throw error;
    }
  };

  // Release funds from custody back to the user's specified address
  public releaseFunds = async (
    userId: string,
    amountInEther: number,
    walletId: string,
    cryptoType: string,
    toAddress: string,
  ) => {
    const userFundsInCustody = new UserFundsInCustodyValue(userId, amountInEther, cryptoType, walletId, toAddress);

    try {
      this.nonce = await this.fetchNonce(this.custodyWalletAddress);
      const transactionObject = {
        from: this.custodyWalletAddress,
        to: userFundsInCustody.to,
        value: this.web3.utils.toWei(amountInEther.toString(), 'ether'),
        gas: this.web3.utils.toHex(21000), // Default gas limit
        gasPrice: this.web3.utils.toHex(await this.web3.eth.getGasPrice()),
        nonce: this.web3.utils.toHex(this.nonce),
      };

      // Assumindo que a carteira de custódia tem a chave privada disponível
      const custodyPrivateKey = 'c6a9b6362456da20be564340dd19588ba54a7ff4e6390bd78953fb1d3a935f21'; // Defina a chave privada da carteira de custódia

      const signedTransaction = await this.web3.eth.accounts.signTransaction(transactionObject, custodyPrivateKey);

      await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

      await this.custodyRepository.releaseFunds(
        userFundsInCustody.userId,
        userFundsInCustody.amount,
        userFundsInCustody.walletId,
        userFundsInCustody.cryptoType,
        userFundsInCustody.to!,
      );
    } catch (error: any) {
      console.error('Error while releasing funds:', error);
      throw error;
    }
  };

  // Check if the specified amount of funds is retained for the user
  public isFundsRetained = async (userId: string, amountInEther: number, walletId: string, cryptoType: string) => {
    const isFunds = await this.custodyRepository.isFundsRetained(userId, amountInEther, walletId, cryptoType);
    return isFunds;
  };

  // Fetch the current nonce for the user's wallet
  private async fetchNonce(addressUserWallet: string): Promise<number> {
    try {
      const nonce = await this.web3.eth.getTransactionCount(addressUserWallet, 'pending');
      return Number(nonce);
    } catch (error: any) {
      throw new Error('Error fetching nonce: ' + error.message);
    }
  }
}
