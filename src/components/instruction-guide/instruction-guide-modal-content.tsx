'use client';
import { ReactNode } from 'react';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';

type Props = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export default function InstructionGuideModalContent({
  open,
  onClose,
  children,
}: Props) {
  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />
      {children}
    </ModalRight>
  );
}
