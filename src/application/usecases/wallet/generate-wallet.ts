import { WalletValue } from '../../../domain';
import { WalletRepository } from '../../repositories';

export class WalletUseCase {
  constructor(private walletRepository: WalletRepository) {}

  public generateWallet = async (userId: string) => {
    const walletValue = new WalletValue(userId);

    const walletGenerated = await this.walletRepository.generateWallet(walletValue);

    return walletGenerated;
  };
}
