import { TransactionEntity, WalletEntity } from '../..';

export interface UserEntity {
  uuid: string;
  email: string;
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  wallets?: WalletEntity[];
  transactions?: TransactionEntity[];
  retainedFunds?: RetainedFundsEntity[];
}

export interface RetainedFundsEntity {
  id: string;
  userId: string;
  walletId: string;
  amount: number;
  cryptoType: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
