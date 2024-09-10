'use client';

import { Network } from '@/types/web3';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaEthereum } from 'react-icons/fa';
import { useAccount, useSignMessage } from 'wagmi';

import { Button, Stack, Typography } from '@mui/material';

import { SignButtonsProps } from './types';

export default function EVMButton({
  message,
  onSign,
  onError,
}: SignButtonsProps) {
  const { signMessageAsync: signMessageEvm } = useSignMessage();
  const { address, isConnected } = useAccount();

  const onSignEVM = async () => {
    try {
      const res = await signMessageEvm({ message });
      onSign(address!, res, Network.Evm);
    } catch (e) {
      onError(JSON.stringify(e), Network.Evm);
    }
  };

  return (
    <Stack>
      <Typography>
        <FaEthereum /> EVM
      </Typography>
      <Stack
        direction="row"
        gap={2}
        sx={{
          width: '100%',
          'div, div > button': {
            width: isConnected ? '100%' : undefined,
          },
        }}
      >
        <ConnectButton label="Sign in EVM" showBalance={false} />
        {isConnected && (
          <Button
            variant="contained"
            color="primary"
            onClick={onSignEVM}
            disabled={!isConnected}
            sx={{ flexShrink: 0 }}
          >
            Sign message
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
