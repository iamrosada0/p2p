export interface TransactionEntity {
  uuid: string;
  from: string;
  to: string;
  gas: number;
  value: string;
  gasPrice: number;
  nonce: number;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
