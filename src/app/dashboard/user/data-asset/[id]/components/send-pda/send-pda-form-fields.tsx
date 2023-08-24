'use client';
import { useFormContext } from 'react-hook-form';

import { Divider, Stack, TextField } from '@mui/material';

import { SendPdaSchema } from './schema';

export default function SendPdaFormField() {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<SendPdaSchema>();

  return (
    <Stack
      divider={<Divider sx={{ mb: 2, mt: 2, mx: { xs: -3, md: -6 } }} />}
      gap={3}
    >
      <TextField
        required
        label="label field"
        id="id-field"
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
    </Stack>
  );
}
