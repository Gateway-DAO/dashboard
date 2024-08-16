'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import UsernameField from '@/app/dashboard/components/forms/username-field';
import { useGtwSession } from '@/context/gtw-session-provider';
import useDebouncedUsernameAvailability from '@/hooks/use-debounced-username-avaibility';
import { settings } from '@/locale/en/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

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
    availability,
    onStartCheckAvailability,
    onCheckAvailability,
    onResetAvailability,
  } = useDebouncedUsernameAvailability();

  const updateUsername = useMutation({
    mutationKey: ['updateUsername'],
    mutationFn: async (username: string) =>
      privateApi.update_username({ username }),
  });

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(updateUsernameSchema as any),
    values: {
      username: initialUsername,
    },
  });

  const onCancel = () => {
    reset();
    onResetAvailability();
    setValue('username', initialUsername);
  };

  const onSubmit = async (data: { username: string }) => {
    if (availability !== 'success' || !canUpdateUsername) return;
    try {
      await updateUsername.mutateAsync(data.username);
      await update();
      reset();
    } catch {
      enqueueSnackbar('Failed to update username', { variant: 'error' });
    }
  };

  const helperText = useMemo(() => {
    if (errors.username?.message) return errors.username.message;
    if (availability === 'invalid') return settings.username.not_available;
    return canUpdateUsername
      ? settings.username.can_edit
      : settings.username.when_can_edit(30 - diffUpdateDays);
  }, [
    errors.username?.message,
    availability,
    canUpdateUsername,
    diffUpdateDays,
  ]);

  const onSameUsername = () => {
    reset();
    onResetAvailability();
  };

  const onInvalidUsername = () => {
    onResetAvailability();
  };

  const onValidUsername = (value: string) => {
    onStartCheckAvailability();
    onCheckAvailability(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UsernameField
        avaibility={availability}
        canUpdateUsername={canUpdateUsername}
        control={control}
        helperText={helperText}
        initialUsername={initialUsername}
        isLoading={updateUsername.isLoading}
        onCancel={onCancel}
        onSameUsername={onSameUsername}
        onInvalidUsername={onInvalidUsername}
        onValidUsername={onValidUsername}
      />
    </form>
  );
}
