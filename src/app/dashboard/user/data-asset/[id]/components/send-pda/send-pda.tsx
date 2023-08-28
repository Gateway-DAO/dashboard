'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import ConfirmDialog from '@/components/modal/confirm-dialog';
import ModalRight from '@/components/modal/modal-right';
import ModalTitle from '@/components/modal/modal-title';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToggle } from '@react-hookz/web/cjs/useToggle';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';

import { sendPdaSchema } from './schema';
import SendPdaFormField from './send-pda-form-fields';
import SendPdaFormSuccessfully from './send-pda-form-successfully';

export default function SendPda() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [confirmDiscardChanges, setConfirmDiscardChanges] = useState(false);
  const [openSendPda, setOpenSendPda] = useToggle(false);
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

  const toggleModal = () => {
    if (openSendPda) {
      router.back();
      setPdaSent(undefined);
    } else {
      router.push('#send-pda');
    }
    setOpenSendPda();
  };

  const closeModel = () => {
    setConfirmDiscardChanges(true);
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        sx={{
          mb: 2,
          width: '100%',
          fontWeight: 700,
          fontSize: 13,
        }}
        onClick={() => {
          router.push('#send-pda');
          setOpenSendPda(true);
        }}
      >
        {common.actions.share_a_copy}
      </Button>
      <ModalRight open={openSendPda} onClose={closeModel}>
        <ModalTitle onClose={closeModel} />
        {pdaSent ? (
          <SendPdaFormSuccessfully id={pdaSent} />
        ) : (
          <FormProvider {...methods}>
            <Stack
              component="form"
              id="send-pda-form"
              onSubmit={methods.handleSubmit(handleMutation)}
            >
              <Typography fontSize={34}>
                {pda.share.share_a_copy_with}
              </Typography>
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
                // disabled={true}
                onClick={() => setPdaSent('id')}
              >
                {common.actions.share_now}
              </LoadingButton>
            </Stack>
          </FormProvider>
        )}
      </ModalRight>
      <ConfirmDialog
        open={confirmDiscardChanges}
        negativeAnswer={pda.dialog.negative}
        positiveAnswer={pda.dialog.positive}
        title={pda.dialog.title}
        setOpen={setConfirmDiscardChanges}
        onConfirm={toggleModal}
      >
        {pda.dialog.text}
      </ConfirmDialog>
    </>
  );
}
