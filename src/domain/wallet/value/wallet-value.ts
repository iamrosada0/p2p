import { randomUUID } from 'crypto';
import Wallet from 'ethereumjs-wallet';

import { WalletEntity } from '../entity/wallet';

export class WalletValue implements WalletEntity {
  public uuid: string;
  public publicKey: string;
  public privateKey: string;
  public addressUserWallet: string;
  public userId: string;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  constructor(userId: string) {
    this.uuid = randomUUID();
    this.privateKey = Wallet.generate().getPrivateKeyString();
    this.userId = userId;
    this.publicKey = Wallet.fromPrivateKey(Buffer.from(this.privateKey, 'hex')).getPublicKeyString();

    // Derivar o endereço da carteira do privado
    this.addressUserWallet = Wallet.fromPrivateKey(Buffer.from(this.privateKey, 'hex')).getChecksumAddressString();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
