export interface UserEntity {
  uuid: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
