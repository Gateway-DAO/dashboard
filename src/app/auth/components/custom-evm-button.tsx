import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaEthereum } from 'react-icons/fa';

import { Button, Typography } from '@mui/material';

type Props = {
  onFirstModal: (value: boolean) => void;
};

export function CustomEvmButton({ onFirstModal }: Props) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
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
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="contained"
                    startIcon={<FaEthereum fontSize="24" />}
                    onClick={() => {
                      openConnectModal();
                    }}
                  >
                    EVM
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={() => {
                      onFirstModal(false);
                      openChainModal;
                    }}
                  >
                    Wrong network
                  </Button>
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
