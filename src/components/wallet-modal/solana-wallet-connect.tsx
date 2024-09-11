'use client';

import SolanaIcon from '@/components/icons/solana';
import useSolConnectHandler from '@/services/wallets/use-sol-connect-handler';
import { Network } from '@/types/web3';

import WalletModalButton from './wallet-modal-button';

type Props = {
  onConnect: (address: string, network: Network) => void;
};

export default function SolanaWalletConnect({ onConnect }: Props) {
  const onOpenModal = useSolConnectHandler((address) =>
    onConnect(address, Network.Sol)
  );

  return (
    <WalletModalButton
      startIcon={<SolanaIcon sx={{ fontSize: '24' }} />}
      onClick={onOpenModal}
    >
      Solana
    </WalletModalButton>
  );
}
