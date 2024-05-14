export interface CustodyRepository {
  /**
   * Retain a specified amount of funds from a user's account.
   *
   * @param userId - The ID of the user.
   * @param amount - The amount of funds to be retained.
   * @returns A promise that resolves when the operation is complete.
   */
  retainFunds(userId: string, amount: number, walletId: string, cryptoType: string): Promise<void>;

  /**
   * Release a specified amount of funds to a user's account.
   *
   * @param userId - The ID of the user.
   * @param amount - The amount of funds to be released.
   * @returns A promise that resolves when the operation is complete.
   */
  releaseFunds(userId: string, amount: number, walletId: string, cryptoType: string): Promise<void>;

  /**
   * Check if a specified amount of funds is retained for a user.
   *
   * @param userId - The ID of the user.
   * @param amount - The amount of funds to check.
   * @returns A promise that resolves with a boolean indicating whether the specified amount of funds is retained.
   */
  isFundsRetained(userId: string, amount: number, walletId: string, cryptoType: string): Promise<boolean>;
}
