import SuiIcon from '@/components/icons/sui';
import { Network } from '@/types/web3';
import { limitCharsOffset } from '@/utils/string';
import { useToggle } from '@react-hookz/web';
import { ConnectModal, useWallet } from '@suiet/wallet-kit';

import { Button, Stack, Typography } from '@mui/material';

import { SignButtonsProps } from './types';

// Note: You'll need to import appropriate SUI wallet connection hooks
// import { useWallet } from '@mysten/wallet-adapter-react';

export default function SuiButton({
  message,
  onSign,
  onError,
}: SignButtonsProps) {
  // Replace this with actual SUI wallet hook
  const { signPersonalMessage, connected, disconnect, account } = useWallet();
  const [showModal, toggleModal] = useToggle(false);

  const onSignSUI = async () => {
    try {
      const { signature } = await signPersonalMessage({
        message: new TextEncoder().encode(message),
      });
      onSign(account?.address || '', signature, Network.Sui);
    } catch (e) {
      onError(JSON.stringify(e), Network.Sui);
    }
  };

  if (!connected) {
    return (
      <ConnectModal open={showModal} onOpenChange={toggleModal}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => toggleModal()} // Replace with appropriate wallet selection method
          startIcon={<SuiIcon />}
          size="large"
        >
          Connect with {Network.Sui} Wallet
        </Button>
      </ConnectModal>
    );
  }

  return (
    <Stack
      direction={{
        lg: 'row',
      }}
      gap={2}
      justifyContent="space-between"
    >
      <Stack component={Typography} direction="row" alignItems="center" gap={1}>
        <SuiIcon sx={{ width: 16 }} />{' '}
        {limitCharsOffset(account?.address || '', 4, 4)}
      </Stack>
      <Stack
        direction={{
          lg: 'row',
        }}
        gap={1}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => disconnect()}
          sx={{ flexShrink: 0 }}
          size="large"
        >
          Disconnect
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSignSUI}
          sx={{ flexShrink: 0 }}
          size="large"
        >
          Sign message
        </Button>
      </Stack>
    </Stack>
  );
}
