/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserFundsInCustodyValue } from '../../../domain';
import { CustodyRepository } from '../../repositories';

export class CustodyUseCase {
  constructor(private readonly custodyRepository: CustodyRepository) {}

  public retainFunds = async (userId: string, amount: number, walletId: string, cryptoType: string) => {
    const userFoundInfo = new UserFundsInCustodyValue(userId, amount, cryptoType, walletId);

    await this.custodyRepository.retainFunds(
      userFoundInfo.userId,
      userFoundInfo.amount,
      userFoundInfo.walletId,
      userFoundInfo.cryptoType,
    );
  };

  public releaseFunds = async (userId: string, amount: number, walletId: string, cryptoType: string) => {
    const userFoundInfo = new UserFundsInCustodyValue(userId, amount, cryptoType, walletId);

    await this.custodyRepository.releaseFunds(
      userFoundInfo.userId,
      userFoundInfo.amount,
      userFoundInfo.walletId,
      userFoundInfo.cryptoType,
    );
  };

  public isFundsRetained = async (userId: string, amount: number, walletId: string, cryptoType: string) => {
    const isFunds = await this.custodyRepository.isFundsRetained(userId, amount, walletId, cryptoType);
    return isFunds;
  };
}
