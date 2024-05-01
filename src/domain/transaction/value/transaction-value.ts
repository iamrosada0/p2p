/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes } from 'crypto';
import Web3 from 'web3';
import { TransactionEntity } from '../entity/transactions';

export class TransactionValue implements TransactionEntity {
  public value: string;
  public recipientAddress: string;
  public gasLimit: number;
  public gasPrice: number;
  public nonce: number;
  public uuid: string;
  public publicKey: string;
  public privateKey: string;
  public addressUserWallet: string;
  public userId: string;
  public web3: Web3;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    userId: string,
    toAddress: string,
    amountInEther: number,
    web3: Web3,
    privateKey: string | undefined,
    publicKey: string | undefined,
    addressUserWallet: string | undefined,
  ) {
    this.userId = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.web3 = web3;

    // Generate random UUID
    this.uuid = randomBytes(16).toString('hex');

    // Set recipient address
    this.recipientAddress = toAddress;

    // Convert amount to wei
    this.value = this.web3.utils.toWei(amountInEther.toString(), 'ether');

    // Set gas limit and price
    this.gasLimit = 21000; // Default gas limit
    this.gasPrice = 100; // Default gas price

    // Set nonce (replace this with your logic to calculate nonce)
    this.nonce = 0;

    // Set user wallet address (replace this with your logic to get user's wallet address)
    this.addressUserWallet = addressUserWallet as any;

    // Set public and private keys (replace this with your logic to generate or retrieve keys)
    this.publicKey = publicKey as any;
    this.privateKey = privateKey as any;
  }
}
