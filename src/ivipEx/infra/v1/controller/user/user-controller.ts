import { Request, Response } from 'express';

import { UserUseCase } from '../../../../application/usecases/user/create-user';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { password, email } = req.body;

      await this.userUseCase.registerUser(email, password);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
