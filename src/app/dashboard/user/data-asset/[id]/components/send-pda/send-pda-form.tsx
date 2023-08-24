'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Divider, Stack } from '@mui/material';

import { sendPdaSchema } from './schema';
import SendPdaFormContainer from './send-pda-form-container';
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
        <SendPdaFormContainer
          methods={methods}
          onSubmit={methods.handleSubmit(handleMutation)}
        >
          <Stack
            divider={<Divider sx={{ mb: 2, mt: 2, mx: { xs: -3, md: -6 } }} />}
            gap={3}
          >
            Test
            <SendPdaFormField />
          </Stack>
        </SendPdaFormContainer>
      )}
    </>
  );
}
