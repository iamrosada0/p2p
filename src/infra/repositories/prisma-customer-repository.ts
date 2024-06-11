/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRepository } from '../../application';
import { UserEntity, WalletEntity, TransactionEntity, RetainedFundsEntity } from '../../domain';
import { prisma } from '../database/prisma/prisma';

export class PrismaUsersRepository implements UserRepository {
  async findById(uuid: string): Promise<UserEntity | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
      include: {
        wallets: true,
        transactions: true,
        retainedFunds: true,
      },
    });

    if (!foundUser) return null;

    return this.createUserEntity(foundUser as any);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        wallets: true,
        transactions: true,
        retainedFunds: true,
      },
    });

    if (!foundUser) return null;

    return this.createUserEntity(foundUser as any);
  }

  async registerUser(user: UserEntity): Promise<void> {
    await prisma.user.create({
      data: {
        uuid: user.uuid,
        email: user.email,
        updatedAt: String(user.updatedAt),
        createdAt: String(user.createdAt),
        password: user.password,
      },
    });
  }

  private createUserEntity(
    prismaUser: UserEntity & {
      wallets: WalletEntity[];
      transactions: TransactionEntity[];
      retainedFunds: RetainedFundsEntity[];
    },
  ): UserEntity {
    return {
      uuid: prismaUser.uuid,
      email: prismaUser.email,
      password: prismaUser.password,
      updatedAt: prismaUser.updatedAt,
      createdAt: prismaUser.createdAt,
      wallets: prismaUser.wallets?.map((wallet) => ({
        uuid: wallet.uuid,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        addressUserWallet: wallet.addressUserWallet,
        userId: wallet.userId,
        createdAt: wallet.createdAt,
        updatedAt: wallet.updatedAt,
      })),
      transactions: prismaUser.transactions?.map((transaction) => ({
        uuid: transaction.uuid,
        from: transaction.from,
        to: transaction.to,
        gas: transaction.gas, // Ensure gas is a string
        value: transaction.value,
        gasPrice: transaction.gasPrice, // Ensure gasprice is a string
        nonce: transaction.nonce, // Ensure nonce is a string
        userId: transaction.userId,
        updatedAt: String(transaction.updatedAt),
        createdAt: String(transaction.createdAt),
      })),
      retainedFunds: prismaUser.retainedFunds?.map((retainedFund) => ({
        id: retainedFund.id,
        userId: retainedFund.userId,
        walletId: retainedFund.walletId,
        amount: retainedFund.amount,
        cryptoType: retainedFund.cryptoType,
        createdAt: retainedFund.createdAt,
        updatedAt: retainedFund.updatedAt,
      })),
    };
  }
}
