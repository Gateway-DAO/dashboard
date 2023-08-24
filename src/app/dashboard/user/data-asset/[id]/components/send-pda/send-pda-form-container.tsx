import { ReactNode } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

type CreateCredentialProps = {
  methods: UseFormReturn<any>;
  children: ReactNode;
  onSubmit: () => void;
};
export default function SendPdaFormContainer({
  methods,
  children,
  onSubmit,
}: CreateCredentialProps) {
  return (
    <FormProvider {...methods}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          top: { xs: 28, md: 48 },
        }}
      >
        Title modal
      </Typography>
      <Stack component="form" id="send-pda-form" onSubmit={onSubmit}>
        <Stack>{children}</Stack>
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{
            height: 42,
            display: 'flex',
            borderRadius: 1,
            mt: 3,
          }}
          id="send-pda-button-issue"
        >
          Send PDA
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
