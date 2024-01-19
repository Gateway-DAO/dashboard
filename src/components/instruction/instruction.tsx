'use client';
import QuestionSquaredIcon from '@/components/icons/question-squared';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';

import InstructionHeader from './header';

type Props = {
  open: boolean;
  onClose: () => void;
  link: string;
  title: string;
  description: string;
};

export default function Instruction({
  open,
  link,
  title,
  description,
  onClose,
}: Props) {
  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <QuestionSquaredIcon sx={{ width: 38, height: 40 }} />
      </ModalHeader>
      <InstructionHeader title={title} link={link} description={description} />
    </ModalRight>
  );
}
