import { Request, Response } from 'express';
import { TransactionUseCase } from '../../../application/usecases/transaction/create-transaction';

export class TransactionController {
  constructor(private transactionUseCase: TransactionUseCase) {
    this.transaction = this.transaction.bind(this);
  }

  async transaction(req: Request, res: Response): Promise<void> {
    try {
      const { userId, toAddress, amountInEther } = req.body;

      await this.transactionUseCase.transaction(userId, toAddress, amountInEther);

      res.status(201).json({ message: 'User transaction processed successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
