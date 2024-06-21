'use client';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { common } from '@/locale/en/common';
import { PrivateDataAsset } from '@/services/protocol-v3/types';

import { Button } from '@mui/material';

import { ShareCopyChooseUsername } from './share-copy-choose-username';
import ShareCopyFormError from './share-copy-form-error';
import ShareCopyFormSuccessfully from './share-copy-form-success';
import ShareCopyQrCode from './share-copy-qr-code/share-copy-qr-code';
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
        {state.status === 'qr-code' && (
          <ShareCopyQrCode
            identification={state.identifier!}
            pda={pda}
            onSuccess={onSuccess}
            onError={onError}
          />
        )}
        {state.status === 'success' && (
          <ShareCopyFormSuccessfully proof={state.proof!} />
        )}
        {state.status === 'error' && (
          <ShareCopyFormError error={state.error!} />
        )}
      </ModalRight>
    </>
  );
}
