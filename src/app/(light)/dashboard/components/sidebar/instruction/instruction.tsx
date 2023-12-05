'use client';
import QuestionSquaredIcon from '@/components/icons/question-squared';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { queries } from '@/constants/queries';
import { apiPublic } from '@/services/protocol/api';
import { Explorer_Data_Model_Detail_OverviewQuery } from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';
import InstructionHeader from './header';

type Props = {
  open: boolean;
  onClose: () => void;
  link: string;
  title: string;
  description: string;
};

export default function Instrunction({
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
