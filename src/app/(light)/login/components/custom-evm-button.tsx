import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaEthereum } from 'react-icons/fa';

import { Button, Typography } from '@mui/material';

import WalletModalButton from './wallet-modal-button';

type Props = {
  onClose: () => void;
};

export function CustomEvmButton({ onClose }: Props) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            style={{
              width: '100%',
            }}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                width: '100%',
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <WalletModalButton
                    id="connect-evm"
                    variant="contained"
                    startIcon={<FaEthereum fontSize="24" />}
                    onClick={() => {
                      openConnectModal();
                    }}
                  >
                    EVM
                  </WalletModalButton>
                );
              }

              if (chain.unsupported) {
                return (
                  <WalletModalButton
                    onClick={() => {
                      onClose();
                      openChainModal;
                    }}
                  >
                    Wrong network
                  </WalletModalButton>
                );
              }

              return (
                <Typography color="text.secondary">Redirecting..</Typography>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
