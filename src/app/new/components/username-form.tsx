'use client';
import { LoadingButton } from '@/components/buttons/loading-button';
import { usernameRegex } from '@/constants/username';
import { auth } from '@/locale/en/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';

import { InputAdornment, TextField } from '@mui/material';

export default function UsernameForm() {
  const {
    address: evmAddress,
    isConnecting,
    isReconnecting,
    isConnected,
  } = useAccount();
  const { publicKey, connected, connecting } = useWallet();

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        username: z.string().regex(usernameRegex),
      })
    ),
  });

  console.log('evm', { isConnecting, isReconnecting, isConnected });
  console.log('solana', { connected, connecting });

  const wallet_address = evmAddress || publicKey?.toString();
  const usernameError = errors.username?.message?.toString();
  const helperText = usernameError || auth.rules.create_username;

  return (
    <>
      <TextField
        id="username"
        label="Enter username"
        {...register('username')}
        error={!!usernameError}
        helperText={helperText}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />
      <LoadingButton size="large" variant="contained">
        Create now
      </LoadingButton>
    </>
  );
}
