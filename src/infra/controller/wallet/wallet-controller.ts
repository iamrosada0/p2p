import { Request, Response } from 'express';
import { WalletUseCase } from '../../../application';

export class WalletController {
  constructor(private WalletUseCase: WalletUseCase) {
    this.generateWallet = this.generateWallet.bind(this);
  }

  async generateWallet(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;

      await this.WalletUseCase.generateWallet(userId);
      res.status(201).json({ message: 'Wallet registered successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
