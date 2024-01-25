'use client';
import { usePokt } from '@/context/pokt-provider';
import { Chain } from '@/services/protocol/types';

import PoktIcon from '../icons/pokt';
import WalletModalButton from './wallet-modal-button';

type Props = {
  onConnect: (address: string, chain: Chain, publicKey: string) => void;
};

export default function PoktWalletConnect({ onConnect }: Props) {
  const { connect, address, publicKey } = usePokt();

  return (
    <WalletModalButton
      startIcon={<PoktIcon sx={{ fontSize: '24' }} />}
      onClick={() => {
        connect();

        if (address && publicKey) {
          onConnect(address, Chain.Pokt, publicKey);
        }
      }}
    >
      POKT Network
    </WalletModalButton>
  );
}
