/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes } from 'crypto';
import Web3 from 'web3';
import { TransactionEntity } from '../entity/transactions';

export class TransactionValue implements TransactionEntity {
  public value: string;
  public recipientAddress: string;
  public gasLimit: number;
  public gasPrice: number;
  public nonce!: number;
  public uuid: string;
  public publicKey: string;
  public privateKey: string;
  public addressUserWallet: string;
  public userId: string;
  public web3: Web3;
  public createdAt: Date;
  public updatedAt: Date;

  // constructor(
  //   userId: string,
  //   toAddress: string,
  //   amountInEther: number,
  //   web3: Web3,
  //   privateKey: string | undefined,
  //   publicKey: string | undefined,
  //   addressUserWallet: string | undefined,
  // ) {
  //   this.userId = userId;
  //   this.createdAt = new Date();
  //   this.updatedAt = new Date();
  //   this.web3 = web3;

  //   // Generate random UUID
  //   this.uuid = randomBytes(16).toString('hex');

  //   // Set recipient address
  //   this.recipientAddress = toAddress;

  //   // Convert amount to wei
  //   this.value = this.web3.utils.toWei(amountInEther.toString(), 'ether');

  //   // Set gas limit and price
  //   this.gasLimit = 21000; // Default gas limit
  //   this.gasPrice = 100; // Default gas price

  //   // Fetch the current nonce for the sender's account
  //   this.web3.eth
  //     .getTransactionCount(addressUserWallet!, 'pending')
  //     .then((count) => {
  //       // Set nonce to the next available nonce
  //       this.nonce = Number(count);
  //       this.constructTransactionObject();
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching nonce:', error);
  //       throw error; // Throw error for handling in calling function
  //     });

  //   // Set user wallet address
  //   this.addressUserWallet = addressUserWallet || '';

  //   // Set public and private keys
  //   this.publicKey = publicKey || '';
  //   this.privateKey = privateKey || '';
  // }
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

    // Set user wallet address
    this.addressUserWallet = addressUserWallet || '';

    // Set public and private keys
    this.publicKey = publicKey || '';
    this.privateKey = privateKey || '';

    // Fetch the current nonce for the sender's account
    // Fetch the nonce for the sender's account
  }
}