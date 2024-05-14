export interface UserFundsInCustodyEntity {
  uuid: string;
  amount: number;
  userId: string;
  walletId: string;
  cryptoType: string;
  createdAt: Date;
  updatedAt: Date;
}
