![alt text](image.png)

- src/
  - domain/
    - user/
      - User.ts
      - UserRepository.ts
    - wallet/
      - Wallet.ts
      - WalletRepository.ts
  - application/
    - services/
      - UserService.ts
      - WalletService.ts
    - dtos/
      - CreateUserDTO.ts
      - CreateWalletDTO.ts
  - usecases/
    - CreateUserUseCase.ts
    - CreateWalletUseCase.ts
  - infrastructure/
    - repositories/
      - UserRepositoryImpl.ts
      - WalletRepositoryImpl.ts
    - api/
      - UserController.ts
      - WalletController.ts
  - index.ts