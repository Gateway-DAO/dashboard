'use client';

import { useSession } from 'next-auth/react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Button, Stack, TextField } from '@mui/material';

import { UpdateDisplayNameSchema, updateDisplayNameSchema } from './schema';

export default function DisplayName() {
  const { data: session, update } = useSession();
  const { privateApi } = useGtwSession();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ['updateDisplayName'],
    mutationFn: async (displayName: string) =>
      privateApi.update_display_name({ displayName }),
  });

  const { enqueueSnackbar } = useSnackbar();

  const initialDisplayName = session?.user.displayName ?? '';

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
