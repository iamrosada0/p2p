const { ethers } = require("ethers");

module.exports = {
  defaultNetwork: "mainnet",
  networks: {
    hardhat: {
    },
    mainnet: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/LiH0yFXoDZ9uGv67whz4Y8VOwawZrSuS',
      accounts: ['e7fd732eeb3085b2fb796c44bab27201af4df4718e13ccfc44f45464b89d5185'] // Corrigido para um array
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
