'use client';

import { useEffect, useState } from 'react';

import { Network } from '@/types/web3';
import { useToggle } from '@react-hookz/web';
import { ConnectModal, useWallet } from '@suiet/wallet-kit';

import SuiIcon from '../icons/sui';
import WalletModalButton from './wallet-modal-button';

type Props = {
  onConnect: (address: string, network: Network) => void;
};

export default function SuiWalletConnect({ onConnect }: Props) {
  const [hasOpened, setHasOpened] = useState(false);
  const [showModal, toggleModal] = useToggle(false);
  const { account, disconnect } = useWallet();

  useEffect(() => {
    if (hasOpened && account?.address) {
      onConnect(account?.address, Network.Sui);
    }
  }, [hasOpened, account?.address]);

  return (
    <ConnectModal open={showModal} onOpenChange={toggleModal}>
      <WalletModalButton
        startIcon={<SuiIcon sx={{ fontSize: '24' }} />}
        onClick={async () => {
          try {
            await disconnect();
          } catch (e) {}
          toggleModal(true);
          setHasOpened(true);
        }}
      >
        {Network.Sui}
      </WalletModalButton>
    </ConnectModal>
  );
}
