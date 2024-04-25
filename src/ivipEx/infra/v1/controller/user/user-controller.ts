import { Request, Response } from 'express';

import { UserRepository } from '../../../../application/repositories/user-repository';

export class UserController {
  constructor(private UserRepository: UserRepository) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      await this.UserRepository.registerUser(email);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
