'use client';

import SolanaIcon from '@/components/icons/solana';
import { Network } from '@/types/web3';
import { limitChars, limitCharsOffset } from '@/utils/string';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import bs58 from 'bs58';

import { Button, Stack, Typography } from '@mui/material';

import { SignButtonsProps } from './types';

export default function SolanaButton({
  message,
  onSign,
  onError,
}: SignButtonsProps) {
  const { signMessage, connect, connected, publicKey, disconnect } =
    useWallet();

  const { setVisible } = useWalletModal();

  const onSignSolana = async () => {
    try {
      if (!connected) {
        await connect();
      }
      const signature = await signMessage!(new TextEncoder().encode(message));
      const response = bs58.encode(signature as Uint8Array);
      onSign(publicKey!.toJSON()!, response, Network.Sol);
    } catch (e) {
      onError(JSON.stringify(e), Network.Sol);
    }
  };

  if (!connected) {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setVisible(true)}
        startIcon={<SolanaIcon />}
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
        <SolanaIcon
          sx={{
            width: 16,
          }}
        />
        {limitCharsOffset(publicKey!.toJSON()!, 4, 4)}
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
          onClick={disconnect}
          sx={{ flexShrink: 0 }}
          size="large"
        >
          Disconnect
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSignSolana}
          sx={{ flexShrink: 0 }}
          size="large"
        >
          Sign message
        </Button>
      </Stack>
    </Stack>
  );
}
