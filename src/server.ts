/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import runServer from './infra/http/v1/user-routes/routes';

export const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8000;

runServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
