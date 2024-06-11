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
const custodyRepo = new PrismaCustodyRepository();
/**
 * Iniciamos casos de uso
 */
const custodyUseCase = new CustodyUseCase(
  custodyRepo,
  walletRepo,
  process.env.APP_INFURA_ID_PROJECT!,
  '0x1F0401676682EE49838F298F24EE4AC4E1349F2e',
);

const userUseCase = new UserUseCase(userRepo);
const walletUseCase = new WalletUseCase(walletRepo);
const transactionUseCase = new TransactionUseCase(
  transactionRepo,
  walletRepo,
  custodyRepo,
  custodyUseCase,

  process.env.APP_INFURA_ID_PROJECT!,
);

/**
 * Iniciar  Controller
 */
const userCtrl = new UserController(userUseCase);
const walletCtrl = new WalletController(walletUseCase);
const transactionCtrl = new TransactionController(transactionUseCase);

export { userCtrl, walletCtrl, transactionCtrl };
