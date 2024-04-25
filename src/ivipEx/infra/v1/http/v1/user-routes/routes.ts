import express from 'express';
import { userCtrl } from '../../../core/injection-dependency/injection-dependency';
import { app } from '../../../../../server';

export default function runServer() {
  const router = express.Router();
  router.post('/register', userCtrl.registerUser);
  app.use('/', router);
}
