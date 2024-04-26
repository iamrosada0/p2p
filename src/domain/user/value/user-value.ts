import { randomUUID } from 'crypto';
import { UserEntity } from '../entity/user';

export class UserValue implements UserEntity {
  public uuid: string;
  public email: string;
  public password: string;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  constructor({ password, email }: Omit<UserEntity, 'uuid'>) {
    this.uuid = randomUUID();
    this.password = password;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
