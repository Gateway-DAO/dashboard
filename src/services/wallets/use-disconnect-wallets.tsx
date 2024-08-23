import { useWallet } from '@solana/wallet-adapter-react';
import { useDisconnect } from 'wagmi';

export default function useDisconnectWallets() {
  const { disconnect: solanaDisconnect } = useWallet();
  const { disconnectAsync: evmDisconnect } = useDisconnect();
  const onDisconnectWallets = async () => {
    await Promise.allSettled([solanaDisconnect(), evmDisconnect()]);
  };

  return {
    onDisconnectWallets,
    onDisconnectSolana: solanaDisconnect,
    onDisconnectEvm: evmDisconnect,
  };
}
