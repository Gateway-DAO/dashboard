'use client';

import SolanaIcon from '@/components/icons/solana';
import { Network } from '@/types/web3';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

import { Button } from '@mui/material';

import { SignButtonsProps } from './types';

export default function SolanaButton({
  message,
  onSign,
  onError,
}: SignButtonsProps) {
  const {
    signMessage: signMessageSolana,
    connect,
    connected,
    publicKey,
  } = useWallet();

  const onSignSolana = async () => {
    try {
      if (!connected) {
        await connect();
      }
      const signature = await signMessageSolana!(
        new TextEncoder().encode(message)
      );
      const response = bs58.encode(signature as Uint8Array);
      onSign(publicKey!.toJSON()!, response, Network.Sol);
    } catch (e) {
      onError(JSON.stringify(e), Network.Sol);
    }
  };

  const onClick = () => {
    onSignSolana();
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      onClick={onClick}
      startIcon={<SolanaIcon />}
      sx={{ mt: { xs: 1, lg: 0 }, width: { lg: '50%' } }}
    >
      Sign with Solana Wallet
    </Button>
  );
}
