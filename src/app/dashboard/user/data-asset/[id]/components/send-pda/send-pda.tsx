'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ConfirmDialog from '@/components/modal/confirm-dialog';
import ModalRight from '@/components/modal/modal-right';
import ModalTitle from '@/components/modal/modal-title';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';
import { useToggle } from '@react-hookz/web/cjs/useToggle';

import { Button } from '@mui/material';

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
        {common.actions.share_a_copy}
      </Button>
      <ModalRight
        open={openSendPda}
        handleClose={() => setConfirmDiscardChanges(true)}
      >
        <ModalTitle onClose={() => setConfirmDiscardChanges(true)} />
        <SendPdaForm />
      </ModalRight>
      <ConfirmDialog
        open={confirmDiscardChanges}
        negativeAnswer={pda.share.dialog_negative}
        positiveAnswer={pda.share.dialog_positive}
        title={pda.share.dialog_title}
        setOpen={setConfirmDiscardChanges}
        onConfirm={toggleModal}
      >
        {pda.share.dialog_text}
      </ConfirmDialog>
    </>
  );
}
