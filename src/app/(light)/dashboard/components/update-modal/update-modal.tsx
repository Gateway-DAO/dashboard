import { useSession } from 'next-auth/react';
import React from 'react';

import ModalTitle from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';

import UpdateQrCode from './update-qr-code';

type Props = {
  isOpen: boolean;
  toggleOpen: () => void;
};

export default function UpdateModal({ isOpen, toggleOpen }: Props) {
  const { data } = useSession();
  const hasUpdate = !!data && data.pdas.length !== data.myPDACount;

  if (!hasUpdate) return null;
  return (
    <>
      <ModalRight open={isOpen} onClose={toggleOpen}>
        <ModalTitle onClose={toggleOpen} />
        <UpdateQrCode isOpen={isOpen} onClose={toggleOpen} />
      </ModalRight>
    </>
  );
}
