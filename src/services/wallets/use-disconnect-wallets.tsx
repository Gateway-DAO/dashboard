import { useWallet as useSolWallet } from '@solana/wallet-adapter-react';
import { useWallet as useSuiWallet } from '@suiet/wallet-kit';
import { useDisconnect } from 'wagmi';

export default function useDisconnectWallets() {
  const { disconnect: solanaDisconnect } = useSolWallet();
  const { disconnectAsync: evmDisconnect } = useDisconnect();
  const { disconnect: suiDisconnect } = useSuiWallet();

  const onDisconnectWallets = async () => {
    await Promise.allSettled([
      solanaDisconnect(),
      evmDisconnect(),
      suiDisconnect(),
    ]);
  };

  return {
    onDisconnectWallets,
    onDisconnectSolana: solanaDisconnect,
    onDisconnectEvm: evmDisconnect,
    onDisconnectSui: suiDisconnect,
  };
}
