export interface WalletEntity {
  uuid: string;
  privateKey: string;
  publicKey: string;
  addressUserWallet: string;
  userId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
