'use client';
import { useEffect } from 'react';

import SolanaIcon from '@/components/icons/solana';
import { Network } from '@/types/web3';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import WalletModalButton from './wallet-modal-button';

type Props = {
  onConnect: (address: string, network: Network) => void;
};

export default function SolanaWalletConnect({ onConnect }: Props) {
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();

  const address = publicKey?.toString();

  useEffect(() => {
    if (address) {
      onConnect(address, Network.Sol);
    }
  }, [address]);

  return (
    <WalletModalButton
      startIcon={<SolanaIcon sx={{ fontSize: '24' }} />}
      onClick={() => {
        setVisible(true);
      }}
    >
      Solana
    </WalletModalButton>
  );
}
