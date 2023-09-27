'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import useDebouncedUsernameAvaibility from '@/hooks/use-debounced-username-avaibility';
import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';
import { usernameSchema } from '@/schemas/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Check, Close } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';

import { updateUsernameSchema } from './schema';

export default function Username() {
  const { data: session, update } = useSession();

  const initialUsername = session!.user.gatewayId!;

  const {
    avaibility,
    onStartCheckAvaibility,
    onCheckAvaibility,
    onResetAvaibility,
  } = useDebouncedUsernameAvaibility();

  const { mutateAsync } = useMutation({
    mutationKey: ['updateUsername'],
    mutationFn: async (username: string) => {},
  });

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(updateUsernameSchema),
    values: {
      username: initialUsername,
    },
  });

  const username = watch('username');

  const onCancel = () => {
    reset();
    onResetAvaibility();
    setValue('username', initialUsername);
  };

  const onSubmit = async (data: { username: string }) => {
    if (avaibility !== 'success') return;
    try {
      await mutateAsync(data.username);
      await update();
      reset();
    } catch {
      enqueueSnackbar('Failed to update display name', { variant: 'error' });
    }
  };

  const avaibilityText =
    avaibility === 'invalid'
      ? settings.username.not_available
      : settings.username.helper;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="username"
        label={common.general.username}
        {...register('username', {
          onChange(event) {
            const value = event.target.value;
            if (value === initialUsername) {
              reset();
              return onResetAvaibility();
            }

            const { success } = usernameSchema.safeParse(value);
            if (success) {
              onStartCheckAvaibility();
              return onCheckAvaibility(value);
            }
            if (avaibility !== 'idle') {
              onResetAvaibility();
            }
          },
        })}
        error={!!errors.username || avaibility === 'invalid'}
        helperText={errors.username?.message ?? avaibilityText}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
              {avaibility === 'loading' && <CircularProgress size={16} />}
              {avaibility === 'success' && <Check color="success" />}
              {avaibility === 'invalid' && <Close color="error" />}
            </InputAdornment>
          ),
        }}
      />
      {username !== initialUsername && (
        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
            disabled={avaibility !== 'success'}
          >
            {common.actions.save}
          </Button>
          <Button variant="outlined" type="button" onClick={onCancel}>
            {common.actions.cancel}
          </Button>
        </Stack>
      )}
    </form>
  );
}
