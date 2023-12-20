import {
  getChainName,
  getExplorer,
  getExplorerAPI,
  getExplorerAPIKey,
  getSolanaExplorer,
} from '../web3';

describe('Utils: Web3', () => {
  describe('getExplorer', () => {
    it('should return the correct explorer URL for chain IDs', () => {
      expect(getExplorer(1)).toEqual('https://etherscan.io');
      expect(getExplorer(3)).toEqual('https://ropsten.etherscan.io');
      expect(getExplorer(4)).toEqual('https://rinkeby.etherscan.io');
      expect(getExplorer(5)).toEqual('https://goerli.etherscan.io');
      expect(getExplorer(6)).toEqual('https://kovan.etherscan.io');
      expect(getExplorer(10)).toEqual('https://optimistic.etherscan.io');
      expect(getExplorer(56)).toEqual('https://bscscan.com');
      expect(getExplorer(97)).toEqual('https://testnet.bscscan.com');
      expect(getExplorer(137)).toEqual('https://polygonscan.com');
      expect(getExplorer(42161)).toEqual('https://arbiscan.io');
      expect(getExplorer(80001)).toEqual('https://mumbai.polygonscan.com');
      expect(getExplorer(421611)).toEqual(
        'https://rinkeby-explorer.arbitrum.io'
      );
    });

    it('should return the default explorer URL for unknown chain IDs', () => {
      expect(getExplorer(123)).toEqual('https://etherscan.io');
    });
  });

  describe('getExplorerAPIKey', () => {
    it('should return the correct API key for chain IDs', () => {
      expect(getExplorerAPIKey(1)).toEqual(
        process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
      );
    });
    expect(getExplorerAPIKey(3)).toEqual('https://ropsten.etherscan.io');
    expect(getExplorerAPIKey(4)).toEqual('https://rinkeby.etherscan.io');
    expect(getExplorerAPIKey(5)).toEqual('https://goerli.etherscan.io');
    expect(getExplorerAPIKey(6)).toEqual('https://kovan.etherscan.io');
    expect(getExplorerAPIKey(10)).toEqual(
      process.env.NEXT_PUBLIC_OPTIMISTICSCAN_API_KEY
    );
    expect(getExplorerAPIKey(56)).toEqual('https://bscscan.com');
    expect(getExplorerAPIKey(97)).toEqual('https://testnet.bscscan.com');
    expect(getExplorerAPIKey(137)).toEqual(
      process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY
    );
    expect(getExplorerAPIKey(42161)).toEqual(
      process.env.NEXT_PUBLIC_ARBISCAN_API_KEY
    );
    expect(getExplorerAPIKey(80001)).toEqual('https://mumbai.polygonscan.com');
    expect(getExplorerAPIKey(421611)).toEqual(
      'https://rinkeby-explorer.arbitrum.io'
    );
  });

  it('should return the default API key for unknown chain IDs', () => {
    expect(getExplorerAPIKey(123)).toEqual(
      process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
    );
  });
});

describe('getSolanaExplorer', () => {
  it('should return the correct Solana explorer URL for devnet cluster', () => {
    expect(getSolanaExplorer('devnet', '/transaction/123')).toEqual(
      'https://solscan.io/transaction/123?cluster=devnet'
    );
  });

  it('should return the correct Solana explorer URL for other clusters', () => {
    expect(getSolanaExplorer('mainnet', '/transaction/456')).toEqual(
      'https://solscan.io/transaction/456'
    );
  });
});
describe('getChainName', () => {
  it('should return "Ethereum" for chain ID 1', () => {
    expect(getChainName(1)).toEqual('Ethereum');
    expect(getChainName(3)).toEqual('Ropsten');
    expect(getChainName(4)).toEqual('Rinkeby');
    expect(getChainName(5)).toEqual('Görli');
    expect(getChainName(6)).toEqual('Kovan');
    expect(getChainName(10)).toEqual('Optimistic');
    expect(getChainName(56)).toEqual('Binance Smart Chain');
    expect(getChainName(97)).toEqual('Testnet');
    expect(getChainName(137)).toEqual('Polygon');
    expect(getChainName(42161)).toEqual('Arbiscan');
    expect(getChainName(80001)).toEqual('Mumbai');
    expect(getChainName(421611)).toEqual('Arbitrum');
  });

  it('should return "Ethereum" for unknown chain IDs', () => {
    expect(getChainName(123)).toEqual('Ethereum');
  });
});

describe('getExplorerAPI', () => {
  test('returns the correct API URL for Chain IDS', () => {
    expect(getExplorerAPI(1)).toBe('https://api.etherscan.io/api');
    expect(getExplorerAPI(3)).toBe('https://ropsten.etherscan.io');
    expect(getExplorerAPI(4)).toBe('https://rinkeby.etherscan.io');
    expect(getExplorerAPI(5)).toBe('https://goerli.etherscan.io');
    expect(getExplorerAPI(6)).toBe('https://kovan.etherscan.io');
    expect(getExplorerAPI(10)).toBe('https://api-optimistic.etherscan.io/api');
    expect(getExplorerAPI(56)).toBe('https://bscscan.com');
    expect(getExplorerAPI(97)).toBe('https://testnet.bscscan.com');
    expect(getExplorerAPI(137)).toBe('https://api.polygonscan.com/api');
    expect(getExplorerAPI(42161)).toBe('https://api.arbiscan.io/api');
    expect(getExplorerAPI(80001)).toBe('https://mumbai.polygonscan.com');
    expect(getExplorerAPI(421611)).toBe('https://rinkeby-explorer.arbitrum.io');
  });

  it('retuns default API URL for unknown chain IDs', () => {
    expect(getExplorerAPI(123)).toBe('https://api.etherscan.io/api');
  });
});
