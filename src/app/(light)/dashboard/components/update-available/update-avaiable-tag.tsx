import { useSession } from 'next-auth/react';
import React from 'react';

import ModalTitle from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { useToggle } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';

import { BrowserUpdated } from '@mui/icons-material';
import { Button } from '@mui/material';

import UpdateQrCode from './update-qr-code';

export default function UpdateAvaiableTag() {
  const [isOpen, toggleOpen] = useToggle(false);
  const { data } = useSession();
  const hasUpdate = !!data && data.pdas.length !== data.myPDACount;

  // if (!hasUpdate) return null;
  return (
    <>
      <Button
        endIcon={<BrowserUpdated />}
        onClick={toggleOpen}
        size="small"
        variant="contained"
        sx={{
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderRadius: 0.75,
        }}
        color="info"
      >
        Update available!
      </Button>
      <ModalRight open={isOpen} onClose={toggleOpen}>
        <ModalTitle onClose={toggleOpen} />
        <UpdateQrCode isOpen={isOpen} onClose={toggleOpen} />
      </ModalRight>
    </>
  );
}
