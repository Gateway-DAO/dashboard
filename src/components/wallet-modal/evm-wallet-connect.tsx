'use client';

import { useEffect } from 'react';

import { Network } from '@/types/web3';
import { useAccount } from 'wagmi';

import { CustomEvmButton } from './custom-evm-button';

type Props = {
  onConnect: (address: string, network: Network) => void;
  onClose: () => void;
};

export default function EvmWalletConnect({ onClose, onConnect }: Props) {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      onConnect(address, Network.Evm);
    }
  }, [address]);

  return <CustomEvmButton onClose={onClose} />;
}
