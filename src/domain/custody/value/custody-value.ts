/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBytes } from 'crypto';
import { UserFundsInCustodyEntity } from '../entity/custody';

export class UserFundsInCustodyValue implements UserFundsInCustodyEntity {
  public uuid: string;
  public userId: string;
  public amount: number;
  public walletId: string;
  public to?: string;
  public cryptoType: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(userId: string, funds: number, typeCrypto: string, walletId: string, to?: string) {
    this.userId = userId;
    this.uuid = randomBytes(16).toString('hex');
    this.amount = funds;
    this.to = to;
    this.cryptoType = typeCrypto;
    this.walletId = walletId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
