'use client';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { auth } from '@/locale/en/auth';
import { useForm } from 'react-hook-form';

import { Stack, TextField } from '@mui/material';

export function LoginEmail() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log('onSubmit', data);
    } catch (e: any) {
      setError('email_address', {
        type: 'manual',
        message: e.message,
      });
    }
  };

  return (
    <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        required
        label={auth.steps.choose_email.label}
        type="email"
        id="email_address"
        {...register('email_address')}
        error={!!errors.email_address}
        helperText={errors.email_address?.message as string}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        sx={{ mt: 2, height: 48 }}
        isLoading={false}
      >
        {auth.steps.initial.continue}
      </LoadingButton>
    </Stack>
  );
}
