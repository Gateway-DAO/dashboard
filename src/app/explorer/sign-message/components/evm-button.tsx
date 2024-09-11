'use client';

import { Network } from '@/types/web3';
import { limitCharsOffset } from '@/utils/string';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { FaEthereum } from 'react-icons/fa';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { Button, Stack, Typography } from '@mui/material';

import { SignButtonsProps } from './types';

export default function EVMButton({
  message,
  onSign,
  onError,
}: SignButtonsProps) {
  const { signMessageAsync: signMessageEvm } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const onSignEVM = async () => {
    try {
      const res = await signMessageEvm({ message });
      onSign(address!, res, Network.Evm);
    } catch (e) {
      onError(JSON.stringify(e), Network.Evm);
    }
  };

  if (!isConnected) {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={openConnectModal}
        startIcon={<FaEthereum />}
        size="large"
      >
        Connect with Solana Wallet
      </Button>
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
        <FaEthereum /> {limitCharsOffset(address!, 4, 4)}
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
          onClick={onSignEVM}
          sx={{ flexShrink: 0 }}
          size="large"
        >
          Sign message
        </Button>
      </Stack>
    </Stack>
  );
}
