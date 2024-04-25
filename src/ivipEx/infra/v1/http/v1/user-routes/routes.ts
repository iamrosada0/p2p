import express from 'express';
import { UserCtrl } from '../../../core/injection-dependency/injection-dependency';

export default function runServer() {
  const router = express.Router();
  router.post('/register', UserCtrl.registerUser);
}
