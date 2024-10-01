'use client';

import { useEffect, useState } from 'react';

import { Network } from '@/types/web3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useToggle } from '@react-hookz/web';
import { FaEthereum } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import WalletModalButton from './wallet-modal-button';

type Props = {
  onConnect: (address: string, network: Network) => void;
};

export default function EvmWalletConnect({ onConnect }: Props) {
  const [hadOpenedModal, setOpenedModal] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    if (hadOpenedModal && address) {
      onConnect(address, Network.Evm);
    }
  }, [hadOpenedModal, address]);

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';

        return (
          <WalletModalButton
            id="connect-evm"
            variant="contained"
            startIcon={<FaEthereum fontSize="24" />}
            onClick={async () => {
              openConnectModal();
              setOpenedModal(true);
            }}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                width: '100%',
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {Network.Evm}
          </WalletModalButton>
        );
      }}
    </ConnectButton.Custom>
  );
}
