import { WalletRepository } from '../../application';
import { WalletEntity } from '../../domain';
import { prisma } from '../database/prisma/prisma';

export class PrismaWalletRepository implements WalletRepository {
  findAllUsers(): Promise<[] | WalletEntity[]> {
    throw new Error('Method not implemented.');
  }
  async findDetailWalletByUserId(userId: string): Promise<WalletEntity | null> {
    const foundUser = await prisma.wallet.findFirst({
      where: { userId: userId },
    });
    return foundUser;
  }
  async generateWallet(wallet: WalletEntity): Promise<WalletEntity> {
    const walletCreated = await prisma.wallet.create({
      data: {
        uuid: wallet.uuid,
        privateKey: wallet.privateKey,
        userId: wallet.userId,
        publicKey: wallet.publicKey,
        addressUserWallet: wallet.addressUserWallet,
        updatedAt: String(wallet.updatedAt),
        createdAt: String(wallet.createdAt),
      },
    });

    return walletCreated;
  }
}
