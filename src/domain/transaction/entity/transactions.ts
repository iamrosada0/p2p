import { WalletEntity } from '../../wallet/entity/wallet';

export interface TransactionEntity extends WalletEntity {
  value: string;
  recipientAddress: string;
  gasLimit: number;
  gasPrice: number;
  nonce: number;
}
