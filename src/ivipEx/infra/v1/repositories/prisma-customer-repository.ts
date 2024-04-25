import { UserRepository } from '../../../application/repositories/user-repository';
import { UserEntity } from '../../../domain/user/entity/user';
import { prisma } from '../database/prisma/prisma';

export class PrismaUsersRepository implements UserRepository {
  async findById(id: string): Promise<UserEntity | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return foundUser;
  }

  async findByUserName(name: string): Promise<UserEntity | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    return foundUser;
  }

  async registerUser(user: UserEntity): Promise<void> {
    await prisma.user.create({
      data: {
        uuid: user.uuid,
      },
    });
  }
}
