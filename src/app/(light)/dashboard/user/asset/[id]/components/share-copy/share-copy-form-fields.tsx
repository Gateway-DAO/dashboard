'use client';
import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { SharingCost } from '@/components/sharing-cost/sharing-cost';
import { pda } from '@/locale/en/pda';
import { useFormContext } from 'react-hook-form';

import { Stack } from '@mui/material';

import { ShareCopySchema } from './schema';

export default function ShareCopyFormField() {
  const { clearErrors, control } = useFormContext<ShareCopySchema>();

  return (
    <Stack gap={3}>
      <UserIdentityField clearErrors={clearErrors} control={control} />
      <SharingCost
        label={pda.share.sharing_cost}
        prefix="$"
        value="0.02"
        chip={pda.share.free}
        helperText={pda.share.sharing_cost_helper}
      />
    </Stack>
  );
}
