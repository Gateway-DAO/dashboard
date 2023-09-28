'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { useGtwSession } from '@/context/gtw-session-provider';
import useDebouncedUsernameAvaibility from '@/hooks/use-debounced-username-avaibility';
import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';
import { usernameSchema } from '@/schemas/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Check, Close } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';

import { updateUsernameSchema } from './schema';

export default function Username() {
  const { data: session, update } = useSession();
  const { privateApi } = useGtwSession();

  const initialUsername = session!.user.gatewayId!;

  const diffUpdateDays = useMemo(() => {
    if (!session) return 0;
    if (!session.user.gatewayIdLastupdate) return 31;
    const lastUpdate = dayjs(session.user.gatewayIdLastupdate);
    const now = dayjs();
    const diff = now.diff(lastUpdate, 'day');
    return diff;
  }, [session?.user.gatewayIdLastupdate]);

  const canUpdateUsername = diffUpdateDays > 30;

  const {
    avaibility,
    onStartCheckAvaibility,
    onCheckAvaibility,
    onResetAvaibility,
  } = useDebouncedUsernameAvaibility();

  const { mutateAsync } = useMutation({
    mutationKey: ['updateUsername'],
    mutationFn: async (username: string) =>
      privateApi.update_username({ username }),
  });

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
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
    if (avaibility !== 'success' || !canUpdateUsername) return;
    try {
      await mutateAsync(data.username);
      await update();
      reset();
    } catch {
      enqueueSnackbar('Failed to update display name', { variant: 'error' });
    }
  };

  const helperText = useMemo(() => {
    if (errors.username?.message) return errors.username.message;
    if (avaibility === 'invalid') return settings.username.not_available;
    return canUpdateUsername
      ? settings.username.can_edit
      : settings.username.when_can_edit(30 - diffUpdateDays);
  }, [errors.username?.message, avaibility, canUpdateUsername, diffUpdateDays]);

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
        helperText={helperText}
        disabled={!canUpdateUsername}
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
      {username !== initialUsername && canUpdateUsername && (
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
