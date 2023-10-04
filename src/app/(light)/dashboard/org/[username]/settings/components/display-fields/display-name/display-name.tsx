'use client';

import { useSession } from 'next-auth/react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';

import { UpdateDisplayNameSchema, updateDisplayNameSchema } from './schema';

export default function DisplayName() {
  const { update } = useSession();
  const { organization } = useOrganization();
  const { privateApi } = useGtwSession();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['updateOrgDisplayName'],
    mutationFn: async (name: string) =>
      privateApi.update_org_display_name({ name, id: organization!.id! }),
  });

  const { enqueueSnackbar } = useSnackbar();

  const initialDisplayName = organization?.name ?? '';

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateDisplayNameSchema),
    values: {
      displayName: initialDisplayName,
    },
  });

  const displayName = watch('displayName');

  const onCancel = () => {
    reset();
    if (initialDisplayName) {
      setValue('displayName', initialDisplayName);
    }
  };

  const onSubmit = async (data: UpdateDisplayNameSchema) => {
    try {
      await mutateAsync(data.displayName ?? '');
      await update();
      reset();
    } catch {
      enqueueSnackbar('Failed to update display name', { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="displayName"
        label="Display Name"
        fullWidth
        sx={{ maxWidth: 478 }}
        InputLabelProps={{
          shrink: !!displayName,
        }}
        {...register('displayName')}
        error={!!errors.displayName}
        helperText={errors.displayName?.message}
      />
      {displayName !== initialDisplayName && (
        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
          <LoadingButton
            variant="contained"
            type="submit"
            isLoading={isLoading}
          >
            {common.actions.save}
          </LoadingButton>
          <Button variant="outlined" type="button" onClick={onCancel}>
            {common.actions.cancel}
          </Button>
        </Stack>
      )}
    </form>
  );
}
