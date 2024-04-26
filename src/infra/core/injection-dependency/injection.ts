import { UserUseCase } from '../../../application';
import { UserController } from '../../controller';
import { PrismaUsersRepository } from '../../repositories';

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
const userCtrl = new UserController(userUseCase);

export { userCtrl };
