'use client';
import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { useFormContext } from 'react-hook-form';

import { Stack } from '@mui/material';

import { ShareCopySchema } from './schema';

export default function ShareCopyFormField() {
  const { clearErrors, control } = useFormContext<ShareCopySchema>();

  return (
    <Stack gap={3}>
      <UserIdentityField clearErrors={clearErrors} control={control} />
    </Stack>
  );
}
