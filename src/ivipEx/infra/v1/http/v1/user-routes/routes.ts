import express from 'express';
import { userCtrl } from '../../../core/injection-dependency/injection-dependency';
import { app } from '../../../../../server';

export default function runServer() {
  const apiV1Router = express.Router();
  apiV1Router.post('/register', userCtrl.registerUser);
  app.use('/', apiV1Router);
}
