export interface UserEntity {
  uuid: string;
  email: string;
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
