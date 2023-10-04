'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import UsernameField from '@/app/(light)/dashboard/components/forms/username-field';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useDebouncedUsernameAvaibility from '@/hooks/use-debounced-username-avaibility';
import useOrganization from '@/hooks/use-organization';
import { settings } from '@/locale/en/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { updateUsernameSchema } from './schema';

export default function Username() {
  const { data: session, update } = useSession();
  const { pathnameOrg, organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const router = useRouter();

  const initialUsername = pathnameOrg ?? '';

  // const diffUpdateDays = useMemo(() => {
  //   if (!session) return 0;
  //   if (!session.user.gatewayIdLastupdate) return 31;
  //   const lastUpdate = dayjs(session.user.gatewayIdLastupdate);
  //   const now = dayjs();
  //   const diff = now.diff(lastUpdate, 'day');
  //   return diff;
  // }, [session?.user.gatewayIdLastupdate]);

  // const canUpdateUsername = diffUpdateDays > 30;
  const diffUpdateDays = 0;
  const canUpdateUsername = true;

  const {
    avaibility,
    onStartCheckAvaibility,
    onCheckAvaibility,
    onResetAvaibility,
  } = useDebouncedUsernameAvaibility();

  const updateUsername = useMutation({
    mutationKey: ['updateUsername'],
    mutationFn: async (username: string) =>
      privateApi.update_org_username({ username, id: organization!.id! }),
  });

  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
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

  const onCancel = () => {
    reset();
    onResetAvaibility();
    setValue('username', initialUsername);
  };

  const onSubmit = async (data: { username: string }) => {
    if (avaibility !== 'success' || !canUpdateUsername) return;
    try {
      await updateUsername.mutateAsync(data.username);
      // router.replace(routes.dashboardOrgSettings(data.username));
      // reset();
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

  const onSameUsername = () => {
    reset();
    onResetAvaibility();
  };

  const onInvalidUsername = () => {
    onResetAvaibility();
  };

  const onValidUsername = (value: string) => {
    onStartCheckAvaibility();
    onCheckAvaibility(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UsernameField
        avaibility={avaibility}
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
