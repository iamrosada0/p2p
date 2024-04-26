import { UserRepository } from '../../application';
import { UserEntity } from '../../domain';
import { User, prisma } from '../database/prisma/prisma';

export class PrismaUsersRepository implements UserRepository {
  async findById(uuid: string): Promise<UserEntity | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
    });

    if (!foundUser) return null;

    return this.createUserEntity(foundUser);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!foundUser) return null;

    return this.createUserEntity(foundUser);
  }

  async registerUser(user: UserEntity): Promise<void> {
    await prisma.user.create({
      data: {
        uuid: user.uuid,
        email: user.email,
        updatedAt: String(user.updatedAt),
        createdAt: String(user.createdAt),
        password: user.password,
      },
    });
  }

  private createUserEntity(prismaUser: User): UserEntity {
    return {
      uuid: prismaUser.uuid,
      email: prismaUser.email!,
      password: prismaUser.password,
      updatedAt: prismaUser.updatedAt,
      createdAt: prismaUser.createdAt,
    };
  }
}
