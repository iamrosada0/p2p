import { UserRepository } from '../../repositories/user-repository';
import { UserValue } from '../../../domain/user/value/user-value';

export class UserUseCase {
  constructor(private readonly UserRepository: UserRepository) {}

  public registerUser = async (password: string, email: string) => {
    const userValue = new UserValue({
      password,
      email,
    });

    const UserCreated = await this.UserRepository.registerUser(userValue);
    return UserCreated;
  };

  public getDetailUser = async (uuid: string) => {
    const user = await this.UserRepository.findById(uuid);
    return user;
  };
}
