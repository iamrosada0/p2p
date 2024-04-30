import { Request, Response } from 'express';
import { TransactionUseCase } from '../../../application/usecases/transaction/create-transacttion';

export class TransactionController {
  constructor(private transactionUseCase: TransactionUseCase) {
    this.transaction = this.transaction.bind(this);
  }

  async transaction(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;

      await this.transactionUseCase.transaction(userId);
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
