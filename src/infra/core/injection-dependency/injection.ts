import { UserUseCase, WalletUseCase } from '../../../application';
import { TransactionUseCase } from '../../../application/usecases/transaction/create-transacttion';
import { TransactionController, UserController, WalletController } from '../../controller';
import { PrismaTransactionRepository, PrismaUsersRepository, PrismaWalletRepository } from '../../repositories';

/**
 * Iniciar Repository
 */
const userRepo = new PrismaUsersRepository();
const walletRepo = new PrismaWalletRepository();
const transactionRepo = new PrismaTransactionRepository();
/**
 * Iniciamos casos de uso
 */

const userUseCase = new UserUseCase(userRepo);
const walletUseCase = new WalletUseCase(walletRepo);
const transactionUseCase = new TransactionUseCase(transactionRepo);

/**
 * Iniciar  Controller
 */
const userCtrl = new UserController(userUseCase);
const walletCtrl = new WalletController(walletUseCase);
const transactionCtrl = new TransactionController(transactionUseCase);

export { userCtrl, walletCtrl, transactionCtrl };
