'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import UsernameField from '@/app/dashboard/components/forms/username-field';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useDebouncedUsernameAvailability from '@/hooks/use-debounced-username-avaibility';
import useOrganization from '@/hooks/use-organization';
import { settings } from '@/locale/en/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { updateUsernameSchema } from './schema';

export default function Username() {
  const { update } = useSession();
  const { pathnameOrg, organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const router = useRouter();

  const initialUsername = pathnameOrg ?? '';

  const diffUpdateDays = useMemo(() => {
    if (!organization) return 0;
    if (!organization.usernameUpdatedAt) return 31;
    const lastUpdate = dayjs(organization.usernameUpdatedAt);
    const now = dayjs();
    const diff = now.diff(lastUpdate, 'day');
    return diff;
  }, [organization?.usernameUpdatedAt]);

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
      privateApi.update_org_username({ username, id: organization?.id ?? '' }),
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
      router.push(routes.dashboard.org.settings(data.username));
    } catch {
      enqueueSnackbar('Failed to update display name', { variant: 'error' });
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
