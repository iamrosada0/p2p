import { randomBytes, randomUUID } from 'crypto';
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
    const privateKeyBuffer = randomBytes(32);
    this.privateKey = privateKeyBuffer.toString('hex');
    this.uuid = randomUUID();
    this.userId = userId;
    this.publicKey = Wallet.fromPrivateKey(privateKeyBuffer).getPublicKeyString();

    // Derivar o endereço da carteira do privado
    this.addressUserWallet = Wallet.fromPrivateKey(privateKeyBuffer).getChecksumAddressString();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
