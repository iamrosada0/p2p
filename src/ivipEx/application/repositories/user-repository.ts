import { UserEntity } from '../../domain/user/entity/user';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByUserName(name: string): Promise<UserEntity | null>;
  registerUser(user: UserEntity): Promise<void>;
}
