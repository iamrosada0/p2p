import express from 'express';
import { transactionCtrl, userCtrl, walletCtrl } from '../../../core/injection-dependency';
import { app } from '../../../../server';

export default function runServer() {
  const userRouter = express.Router();
  userRouter.post('/register', userCtrl.registerUser);
  userRouter.post('/generate-wallet', walletCtrl.generateWallet);
  userRouter.post('/transaction', transactionCtrl.transaction);

  app.use('/api/v1/user', userRouter);
}
