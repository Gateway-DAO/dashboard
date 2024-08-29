'use client';

import SolanaIcon from '@/components/icons/solana';
import { Network } from '@/types/web3';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import useConnectHandler from './use-connect-handler';
import WalletModalButton from './wallet-modal-button';

type Props = {
  onConnect: (address: string, network: Network) => void;
};

export default function SolanaWalletConnect({ onConnect }: Props) {
  const { setVisible, visible } = useWalletModal();
  const { publicKey, disconnect } = useWallet();

  const address = publicKey?.toString();

  useConnectHandler({
    address,
    visible,
    onConnect: () => onConnect(address ?? '', Network.Sol),
    disconnect,
  });

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
