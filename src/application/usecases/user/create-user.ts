import { UserRepository } from '../../repositories/user-repository';
import { UserValue } from '../../../domain/user/value/user-value';

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public registerUser = async (password: string, email: string) => {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const userValue = new UserValue({
      password,
      email,
    });

    const userCreated = await this.userRepository.registerUser(userValue);

    return userCreated;
  };

  public getDetailUser = async (uuid: string) => {
    const user = await this.userRepository.findById(uuid);
    return user;
  };

  public findByEmail = async (email: string) => {
    const user = await this.userRepository.findByEmail(email);
    return user;
  };
}
