import { CustodyRepository, CustodyUseCase } from '../../application';
import { prisma } from '../database/prisma/prisma';

export class PrismaCustodyRepository implements CustodyRepository {
  private readonly custodyUseCase: CustodyUseCase;

  constructor(infuraProjectId: string, etherscanApiKey: string) {
    this.custodyUseCase = new CustodyUseCase(infuraProjectId, etherscanApiKey);
  }

  async fetchAndCheckWalletValues(): Promise<void> {
    try {
      const wallets = await prisma.wallet.findMany({
        select: { addressUserWallet: true },
      });

      const addresses = wallets.map((wallet) => wallet.addressUserWallet);
      await this.custodyUseCase.checkReceivedValues(addresses);
    } catch (error) {
      console.error('Error fetching wallet addresses from the database:', error);
    }
  }
}
