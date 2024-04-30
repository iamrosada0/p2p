import { UserUseCase, WalletUseCase } from '../../../application';
import { UserController, WalletController } from '../../controller';
import { PrismaUsersRepository, PrismaWalletRepository } from '../../repositories';

/**
 * Iniciar Repository
 */
const userRepo = new PrismaUsersRepository();
const walletRepo = new PrismaWalletRepository();

/**
 * Iniciamos casos de uso
 */

const userUseCase = new UserUseCase(userRepo);
const walletUseCase = new WalletUseCase(walletRepo);

/**
 * Iniciar  Controller
 */
const userCtrl = new UserController(userUseCase);
const walletCtrl = new WalletController(walletUseCase);

export { userCtrl, walletCtrl };
