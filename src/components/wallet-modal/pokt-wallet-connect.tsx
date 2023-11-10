'use client';
import { Chain } from '@/services/protocol/types';

import WalletModalButton from './wallet-modal-button';
import PoktIcon from '../icons/pokt';
import { usePokt } from '@/context/pokt-provider';

type Props = {
  onConnect: (address: string, chain: Chain) => void;
};

export default function PoktWalletConnect({ onConnect }: Props) {
  const { connect } = usePokt();

  return (
    <WalletModalButton
      startIcon={<PoktIcon sx={{ fontSize: '24' }} />}
      onClick={() => {
        connect();
      }}
    >
      POKT Network
    </WalletModalButton>
  );
}
