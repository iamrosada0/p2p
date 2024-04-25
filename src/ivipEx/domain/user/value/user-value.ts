import { randomUUID } from 'crypto';
import { UserEntity } from '../entity/user';

export class UserValue implements UserEntity {
  uuid: string;
  email: string;
  password: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;

  constructor({ password, email }: Omit<UserEntity, 'uuid'>) {
    this.uuid = randomUUID();
    this.password = password;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
