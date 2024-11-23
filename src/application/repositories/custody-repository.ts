export interface CustodyRepository {
  // getReceivedValue(address: string): Promise<string>;
  // checkReceivedValues(addresses: string[]): Promise<void>;
  fetchAndCheckWalletValues(): Promise<void>;
}
