import { WalletEntity } from '../../wallet/entity/wallet';

export interface TransactionEntity extends WalletEntity {
  value: unknown | string | number;
  recipientAddress: string;
  gasLimit: number;
  gasPrice: number;
  nonce: number;
}
