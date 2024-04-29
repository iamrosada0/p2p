import express from 'express';
import { userCtrl } from '../../../core/injection-dependency';
import { app } from '../../../../server';

export default function runServer() {
  const userRouter = express.Router();
  userRouter.post('/register', userCtrl.registerUser);
  app.use('/api/v1/user', userRouter);
}
