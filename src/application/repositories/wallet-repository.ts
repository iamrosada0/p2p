import { WalletEntity } from '../../domain';

export interface WalletRepository {
  generateWallet(wallet: WalletEntity): Promise<WalletEntity>;
}
