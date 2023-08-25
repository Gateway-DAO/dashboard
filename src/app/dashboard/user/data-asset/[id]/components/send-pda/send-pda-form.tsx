'use client';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

import { sendPdaSchema } from './schema';
import SendPdaFormField from './send-pda-form-fields';
import SendPdaFormSuccessfully from './send-pda-form-successfully';

export default function SendPdaForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [pdaSent, setPdaSent] = useState<string>();

  const methods = useForm({
    resolver: zodResolver(sendPdaSchema as any),
  });

  const handleMutation = async (data: any) => {
    if (!(await methods.trigger())) return;
    try {
      setPdaSent('id');
      methods.reset();
    } catch (e) {
      enqueueSnackbar('test');
    }
  };

  return (
    <>
      {pdaSent ? (
        <SendPdaFormSuccessfully credentialId={pdaSent} />
      ) : (
        <FormProvider {...methods}>
          <Stack
            component="form"
            id="send-pda-form"
            onSubmit={methods.handleSubmit(handleMutation)}
          >
            <Typography fontSize={34}>{pda.share.share_a_copy_with}</Typography>
            <Typography sx={{ mb: 6 }}>
              {pda.share.share_a_copy_description}
            </Typography>
            <SendPdaFormField />
            <LoadingButton
              variant="contained"
              type="submit"
              sx={{
                height: 42,
                display: 'flex',
                borderRadius: 1,
                mt: 3,
              }}
              id="send-pda-button"
              disabled={true}
            >
              {common.actions.share_now}
            </LoadingButton>
          </Stack>
        </FormProvider>
      )}
    </>
  );
}
