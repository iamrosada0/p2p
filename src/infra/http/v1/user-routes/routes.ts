import express from 'express';
import { userCtrl, walletCtrl } from '../../../core/injection-dependency';
import { app } from '../../../../server';

export default function runServer() {
  const userRouter = express.Router();
  userRouter.post('/register', userCtrl.registerUser);
  userRouter.post('/generate-wallet', walletCtrl.generateWallet);

  app.use('/api/v1/user', userRouter);
}
