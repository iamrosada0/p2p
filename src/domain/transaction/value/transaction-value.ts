import { randomBytes } from 'crypto';
import Wallet from 'ethereumjs-wallet';
import Web3 from 'web3';
import { TransactionEntity } from '../entity/transactions';

export class TransactionValue implements TransactionEntity {
  public value: unknown | string | number;
  public recipientAddress: string;
  public gasLimit: number;
  public gasPrice: number;
  public nonce: number;
  public uuid: string;
  public publicKey: string;
  public privateKey: string;
  public addressUserWallet: string;
  public userId: string;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  constructor(userId: string) {
    // Initialize properties
    this.userId = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    // Generate wallet
    const privateKeyBuffer = randomBytes(32);
    const wallet = Wallet.fromPrivateKey(privateKeyBuffer);
    this.privateKey = privateKeyBuffer.toString('hex');
    this.publicKey = wallet.getPublicKeyString();
    this.addressUserWallet = wallet.getChecksumAddressString();
  }

  // Method to sign the transaction
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
