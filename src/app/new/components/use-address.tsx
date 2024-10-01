import { Network } from '@/types/web3';
import { useWallet as useSolWallet } from '@solana/wallet-adapter-react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import { useAccount } from 'wagmi';

export function useAddress(network: Network) {
  const { address: evmAddress } = useAccount();
  const { publicKey } = useSolWallet();
  const { account } = useSuiWallet();

  switch (network) {
    case Network.Evm:
      return evmAddress ?? '';
    case Network.Sol:
      return publicKey?.toString() ?? '';
    case Network.Sui:
      return account?.address ?? '';
    default:
      return '';
  }
}
