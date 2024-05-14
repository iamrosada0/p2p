/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes } from 'crypto';
import { CustodyOfFundsUserEntity } from '../entity/transactions';

export class CustodyOfFundsUserValue implements CustodyOfFundsUserEntity {
  public uuid: string;
  public userId: string;
  public funds: number;
  public walletId: string;
  public typeCrypto: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(userId: string, funds: number, typeCrypto: string, walletId: string) {
    this.userId = userId;
    this.uuid = randomBytes(16).toString('hex');
    this.funds = funds;
    this.typeCrypto = typeCrypto;
    this.walletId = walletId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
