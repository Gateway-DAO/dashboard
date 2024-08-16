'use client';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { auth } from '@/locale/en/auth';
import { getErrorMessage } from '@/locale/en/errors';
import { apiPublic } from '@/services/protocol/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import zod from 'zod';

import { Stack, TextField } from '@mui/material';

import { useLoginStepState } from '../../../providers/step-provider/step-provider';

const schema = zod.object({
  email: zod.string().email(),
});

type FormValue = zod.infer<typeof schema>;

export function LoginEmail() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValue>({
    resolver: zodResolver(schema as any),
  });

  const { setStepState } = useLoginStepState();

  const { mutate, isLoading } = useMutation({
    mutationKey: ['login-email-create-nonce'],
    mutationFn: async (email: string) =>
      apiPublic.create_email_nonce({ email }),
    onSuccess: (response) => {
      setStepState({
        step: 'verify-email-login-code',
        values: {
          email: response.createEmailNonce.email,
        },
      });
    },
    onError(error: any) {
      const { message } = getErrorMessage(error);

      setError('email', {
        type: 'manual',
        message,
      });
    },
  });

  const onSubmit = async (data: FormValue) => mutate(data.email);

  return (
    <Stack component="form" gap={2} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        required
        label={auth.steps.choose_email.label}
        type="email"
        id="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message as string}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        sx={{ mt: 2, height: 48 }}
        isLoading={isLoading}
      >
        {auth.steps.initial.continue}
      </LoadingButton>
    </Stack>
  );
}
