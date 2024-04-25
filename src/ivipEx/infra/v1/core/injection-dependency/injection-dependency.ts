import { UserUseCase } from '../../../../application/usecases/user/create-user';
import { UserController } from '../../controller/user/user-controller';
import { PrismaUsersRepository } from '../../repositories/prisma-customer-repository';

/**
 * Iniciar Repository
 */
const userRepo = new PrismaUsersRepository();

/**
 * Iniciamos casos de uso
 */

const userUseCase = new UserUseCase(userRepo);

/**
 * Iniciar User Controller
 */

export const userCtrl = new UserController(userUseCase);
