'use client';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';

import EducationalModalContent from './educational-modal-content';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EducationalModal({ open, onClose }: Props) {
  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />
      <EducationalModalContent onClose={onClose} />
    </ModalRight>
  );
}
