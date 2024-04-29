import { Request, Response } from 'express';
import { UserUseCase } from '../../../application';

export class UserController {
  constructor(private userUseCase: UserUseCase) {
    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { password, email } = req.body;
      console.log(password, 'password');

      await this.userUseCase.registerUser(password, email);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await this.userUseCase.getDetailUser(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
