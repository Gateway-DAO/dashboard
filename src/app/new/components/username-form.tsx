'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useCallback } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import routes from '@/constants/routes';
import { usernameRegex } from '@/constants/username';
import { auth } from '@/locale/en/auth';
import { handleError } from '@/utils/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';

import { Button, InputAdornment, Stack, TextField } from '@mui/material';

import NewUserCard from './new-user-card';
import { NewUserTitle, UserCreatedTitle } from './titles';

type Props = {
  message: string;
  signature: string;
};

const formSchema = z.object({
  username: z.string().regex(usernameRegex),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UsernameForm({ message, signature }: Props) {
  const { address: evmAddress } = useAccount();
  const { publicKey } = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const wallet_address = evmAddress || publicKey?.toString();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: ['new-user', wallet_address, message, signature],
    mutationFn: async ({ username }: FormSchema) => {
      const res = await signIn('new-user', {
        redirect: false,
        wallet_address,
        signature,
        message,
        username,
      });

      if (!res) {
        throw new Error('Failed to create user');
      }
      if (res.error) {
        throw new Error(res.error);
      }
      return res;
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (!wallet_address || isPending) return;
    try {
      await mutateAsync(data);
    } catch (error) {
      const message = handleError(error, 'Failed to create user');

      if (message.includes('username')) {
        return setError('username', {
          message,
        });
      }
      return enqueueSnackbar(message, { variant: 'error' });
    }
  };

  if (isSuccess) {
    return (
      <Stack gap={5}>
        <UserCreatedTitle />
        <NewUserCard />
        <Button
          component={Link}
          href={routes.dashboard.storage}
          variant="contained"
          size="large"
        >
          Continue
        </Button>
      </Stack>
    );
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} gap={5}>
      <NewUserTitle />
      <TextField
        id="username"
        label="Enter username"
        {...register('username')}
        error={!!errors.username}
        helperText={errors?.username?.message ?? auth.rules.create_username}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />
      <LoadingButton
        type="submit"
        isLoading={isPending}
        size="large"
        variant="contained"
        disabled={!isValid}
      >
        Create now
      </LoadingButton>
    </Stack>
  );
}
