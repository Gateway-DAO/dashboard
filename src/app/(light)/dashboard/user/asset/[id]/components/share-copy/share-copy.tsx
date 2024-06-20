'use client';
import { useRouter } from 'next-nprogress-bar';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { common } from '@/locale/en/common';
import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { useToggle } from '@react-hookz/web/cjs/useToggle';

import { Typography } from '@mui/material';
import { Button } from '@mui/material';

import { ShareCopyChooseUsername } from './share-copy-choose-username';
import { useShareCopyState } from './state';

type Props = {
  pda: PrivateDataAsset;
};

export default function ShareCopy({ pda }: Props) {
  const { state, onClose, onError, onOpen, onQrCode, onSuccess } =
    useShareCopyState();

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={onOpen}
        id="share-a-copy"
      >
        {common.actions.share_a_copy}
      </Button>
      <ModalRight open={state.status !== 'closed'} onClose={onClose}>
        <ModalHeader onClose={onClose} />
        {state.status === 'open' && (
          <ShareCopyChooseUsername onSelectUsername={onQrCode} />
        )}
        {state.status === 'success' && <>Success</>}
        {state.status === 'error' && <Typography>{state.error}</Typography>}
      </ModalRight>
    </>
  );
}
