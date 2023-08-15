/**
 * It returns a URL based on the chain ID
 * @param {number} chainID - The chain ID of the network you want to connect to.
 * @returns A string
 */
export const getExplorer = (chainID: number): string => {
  switch (chainID) {
    case 1:
      return 'https://etherscan.io';
    case 3:
      return 'https://ropsten.etherscan.io';
    case 4:
      return 'https://rinkeby.etherscan.io';
    case 5:
      return 'https://goerli.etherscan.io';
    case 6:
      return 'https://kovan.etherscan.io';
    case 10:
      return 'https://optimistic.etherscan.io';
    case 56:
      return 'https://bscscan.com';
    case 97:
      return 'https://testnet.bscscan.com';
    case 137:
      return 'https://polygonscan.com';
    case 42161:
      return 'https://arbiscan.io';
    case 80001:
      return 'https://mumbai.polygonscan.com';
    case 421611:
      return 'https://rinkeby-explorer.arbitrum.io';
    default:
      return 'https://etherscan.io';
  }
};

/**
 * It returns a URL based on the chain ID
 * @param {number} chainID - The chain ID of the network you want to connect to.
 * @returns A string
 */
export const getExplorerAPI = (chainID: number): string => {
  switch (chainID) {
    case 1:
      return 'https://api.etherscan.io/api';
    case 3:
      return 'https://ropsten.etherscan.io';
    case 4:
      return 'https://rinkeby.etherscan.io';
    case 5:
      return 'https://goerli.etherscan.io';
    case 6:
      return 'https://kovan.etherscan.io';
    case 10:
      return 'https://api-optimistic.etherscan.io/api';
    case 56:
      return 'https://bscscan.com';
    case 97:
      return 'https://testnet.bscscan.com';
    case 137:
      return 'https://api.polygonscan.com/api';
    case 42161:
      return 'https://api.arbiscan.io/api';
    case 80001:
      return 'https://mumbai.polygonscan.com';
    case 421611:
      return 'https://rinkeby-explorer.arbitrum.io';
    default:
      return 'https://api.etherscan.io/api';
  }
};

export const getSolanaExplorer = (chainName: string, text: string): string => {
  switch (chainName) {
    case 'devnet':
      return `https://solscan.io${text}?cluster=devnet`;
    default:
      return `https://solscan.io${text}`;
  }
};

/**
 * It returns a URL based on the chain ID
 * @param {number} chainID - The chain ID of the network you want to connect to.
 * @returns A string
 */
export const getExplorerAPIKey = (chainID: number): string => {
  switch (chainID) {
    case 1:
      return process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string;
    case 3:
      return 'https://ropsten.etherscan.io';
    case 4:
      return 'https://rinkeby.etherscan.io';
    case 5:
      return 'https://goerli.etherscan.io';
    case 6:
      return 'https://kovan.etherscan.io';
    case 10:
      return process.env.NEXT_PUBLIC_OPTIMISTICSCAN_API_KEY as string;
    case 56:
      return 'https://bscscan.com';
    case 97:
      return 'https://testnet.bscscan.com';
    case 137:
      return process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY as string;
    case 42161:
      return process.env.NEXT_PUBLIC_ARBISCAN_API_KEY as string;
    case 80001:
      return 'https://mumbai.polygonscan.com';
    case 421611:
      return 'https://rinkeby-explorer.arbitrum.io';
    default:
      return process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string;
  }
};

export const getChainName = (chainID: number): string => {
  switch (chainID) {
    case 1:
      return 'Ethereum';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    case 5:
      return 'Görli';
    case 6:
      return 'Kovan';
    case 10:
      return 'Optimistic';
    case 56:
      return 'Binance Smart Chain';
    case 97:
      return 'Testnet';
    case 137:
      return 'Polygon';
    case 42161:
      return 'Arbiscan';
    case 80001:
      return 'Mumbai';
    case 421611:
      return 'Arbitrum';
    default:
      return 'Ethereum';
  }
};
