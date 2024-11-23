import Web3 from 'web3';
import axios from 'axios';
import BN from 'bn.js';
import Bottleneck from 'bottleneck';

export class CustodyUseCase {
  private readonly web3: Web3;
  private readonly ETHERSCAN_API_KEY: string;
  private readonly limiter: Bottleneck;

  constructor(infuraProjectId: string, etherscanApiKey: string) {
    this.web3 = new Web3(`https://holesky.infura.io/v3/${infuraProjectId}`);
    this.ETHERSCAN_API_KEY = etherscanApiKey;
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 1250, // Ensure minimum time between requests is 1250 milliseconds (4 requests per 5 seconds)
    });
  }

  async getReceivedValue(address: string): Promise<BN> {
    try {
      const response = await this.limiter.schedule(() =>
        axios.get('https://api.holesky.etherscan.io/api', {
          params: {
            module: 'account',
            action: 'txlist',
            address: address,
            startblock: 0,
            endblock: 99999999,
            sort: 'asc',
            apikey: '3SED3AGJMV6YN2GHQFTJN5JP28TGKD1QBZ',
          },
        }),
      );

      const transactions = response.data.result;
      let totalReceived = new BN('0');

      for (const tx of transactions) {
        if (tx.to.toLowerCase() === address.toLowerCase() && tx.value !== '0') {
          totalReceived = totalReceived.add(new BN(tx.value));
        }
      }

      return totalReceived;
    } catch (error) {
      console.error(`Error fetching transactions for address ${address}:`, error);
      return new BN('0');
    }
  }

  async checkReceivedValues(addresses: string[]): Promise<void> {
    for (const address of addresses) {
      const receivedValue = await this.getReceivedValue(address);
      console.log(
        `Address ${address} has received a total of ${this.web3.utils.fromWei(receivedValue.toString(), 'ether')} ETH.`,
      );
    }
  }
}
