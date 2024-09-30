export enum Network {
  Evm = 'evm',
  Sol = 'sol',
  Sui = 'sui',
}

export const fromNetwork = (network: Network) => {
  switch (network) {
    case Network.Evm:
      return 'EVM';
    case Network.Sol:
      return 'Solana';
    case Network.Sui:
      return 'Sui';
  }
};
