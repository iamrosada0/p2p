import { UserUseCase } from '../../../../application/usecases/user/create-user';
import { UserController } from '../../controller/user/user-controller';
import { PrismaUsersRepository } from '../../repositories/prisma-customer-repository';

/**
 * Iniciar Repository
 */
const UserRepo = new PrismaUsersRepository();

/**
 * Iniciamos casos de uso
 */

const userUseCase = new UserUseCase(UserRepo);

/**
 * Iniciar User Controller
 */

export const UserCtrl = new UserController(userUseCase);
