'use client';

import { useEffect } from 'react';

import { Chain } from '@/services/protocol/types';
import { useAccount } from 'wagmi';

import { CustomEvmButton } from './custom-evm-button';

type Props = {
  onConnect: (address: string, chain: Chain) => void;
  onClose: () => void;
};

export default function EvmWalletConnect({ onClose, onConnect }: Props) {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      onConnect(address, Chain.Evm);
    }
  }, [address]);

  return <CustomEvmButton onClose={onClose} />;
}
