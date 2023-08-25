'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ConfirmDialog from '@/components/modal/confirm-dialog';
import ModalRight from '@/components/modal/modal-right';
import { protocol } from '@/locale/en/protocol';
import { useToggle } from '@react-hookz/web/cjs/useToggle';

import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Stack } from '@mui/material';

import SendPdaForm from './send-pda-form';

export default function SendPda() {
  const router = useRouter();
  const [confirmDiscardChanges, setConfirmDiscardChanges] = useState(false);
  const [openSendPda, setOpenSendPda] = useToggle(false);

  const toggleModal = () => {
    if (openSendPda) {
      router.back();
    } else {
      router.push('#send-pda');
    }
    setOpenSendPda();
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
        {protocol.pda.share_a_copy}
      </Button>
      <ModalRight
        open={openSendPda}
        handleClose={() => setConfirmDiscardChanges(true)}
      >
        <Stack
          sx={{
            pt: { xs: 3, md: 6 },
            pb: { xs: 2, md: 3 },
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <IconButton
            aria-label="close"
            sx={{ backgroundColor: 'action.hover' }}
            onClick={() => setConfirmDiscardChanges(true)}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <SendPdaForm />
      </ModalRight>
      <ConfirmDialog
        open={confirmDiscardChanges}
        negativeAnswer="Nao"
        positiveAnswer="Sim"
        title="Tem certeza?"
        setOpen={setConfirmDiscardChanges}
        onConfirm={toggleModal}
      >
        Dialog text
      </ConfirmDialog>
    </>
  );
}
