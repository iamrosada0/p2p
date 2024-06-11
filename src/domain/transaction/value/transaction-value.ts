/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes } from 'crypto';
import Web3 from 'web3';
import { TransactionEntity } from '../entity/transactions';

export class TransactionValue implements TransactionEntity {
  public value: string;
  public to: string;
  public gas: number;
  public gasPrice: number;
  public nonce!: number;
  public uuid: string;
  public publicKey: string;
  public privateKey: string;
  public from: string;
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
    from: string | undefined,
  ) {
    this.userId = userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.web3 = web3;

    // Generate random UUID
    this.uuid = randomBytes(16).toString('hex');

    // Set recipient address
    this.to = toAddress;

    // Convert amount to wei
    this.value = this.web3.utils.toWei(amountInEther.toString(), 'ether');

    // Set gas limit and price
    this.gas = 21000; // Default gas limit
    this.gasPrice = 100; // Default gas price

    // Set user wallet address
    this.from = from || '';

    // Set public and private keys
    this.publicKey = publicKey || '';
    this.privateKey = privateKey || '';

    // Fetch the current nonce for the sender's account
    // Fetch the nonce for the sender's account
  }
}
