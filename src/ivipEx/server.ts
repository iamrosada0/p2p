import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import runServer from './infra/v1/http/v1/user-routes/routes';

export const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.use((err, req: Request, res: Response) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

runServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
