'use client';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { useToggle } from '@react-hookz/web';

import { Button } from '@mui/material';

import Success from '../success/success';
import Review from './review';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function IssuePdaDialog({ open, onClose }: Props) {
  const [isFinished, setFinished] = useToggle(true);
  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />
      {isFinished ? <Success /> : <Review />}
      <Button onClick={setFinished} sx={{ mt: 5 }}>
        Toggle
      </Button>
    </ModalRight>
  );
}
