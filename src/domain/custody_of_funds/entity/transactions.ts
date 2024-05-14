export interface CustodyOfFundsUserEntity {
  uuid: string;
  userId: string;
  funds: number;
  walletId: string;
  typeCrypto: string;
  createdAt: Date;
  updatedAt: Date;
}
