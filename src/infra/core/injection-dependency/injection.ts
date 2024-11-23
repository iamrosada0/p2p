import { CustodyUseCase, UserUseCase, WalletUseCase } from '../../../application';
import { TransactionUseCase } from '../../../application/usecases/transaction/create-transaction';
import { TransactionController, UserController, WalletController } from '../../controller';
import { PrismaTransactionRepository, PrismaUsersRepository, PrismaWalletRepository } from '../../repositories';
import { PrismaCustodyRepository } from '../../repositories/prisma-custody-repository';

/**
 * Iniciar Repository
 */
const userRepo = new PrismaUsersRepository();
const walletRepo = new PrismaWalletRepository();
const transactionRepo = new PrismaTransactionRepository();
const custodyRepo = new PrismaCustodyRepository(
  process.env.APP_INFURA_ID_PROJECT!,
  '3SED3AGJMV6YN2GHQFTJN5JP28TGKD1QBZ',
);
/**
 * Iniciamos casos de uso
 */

new CustodyUseCase(process.env.APP_INFURA_ID_PROJECT!, '3SED3AGJMV6YN2GHQFTJN5JP28TGKD1QBZ');

// custodyRepo.fetchAndCheckWalletValues();
const interval = setInterval(() => {
  custodyRepo.fetchAndCheckWalletValues();
}, 6000); // 6000 milissegundos = 6 segundos

// Cancelar o setInterval() após um determinado tempo (opcional)
// Isso evitará que a função continue sendo chamada indefinidamente
// Aqui, cancelamos após 1 hora (3600000 milissegundos = 1 hora)
setTimeout(() => {
  clearInterval(interval);
}, 3600000); //

const userUseCase = new UserUseCase(userRepo);
const walletUseCase = new WalletUseCase(walletRepo);
const transactionUseCase = new TransactionUseCase(transactionRepo, walletRepo, process.env.APP_INFURA_ID_PROJECT!);

/**
 * Iniciar  Controller
 */
const userCtrl = new UserController(userUseCase);
const walletCtrl = new WalletController(walletUseCase);
const transactionCtrl = new TransactionController(transactionUseCase);

export { userCtrl, walletCtrl, transactionCtrl };
