'use client';
import { ReactNode } from 'react';

import QuestionSquaredIcon from '@/components/icons/question-squared';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';

import { Stack, Typography } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  videoUrl?: string;
  children?: ReactNode;
};

export default function InstructionGuideModalVideo({
  open,
  title,
  description,
  onClose,
  videoUrl,
  children,
}: Props) {
  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        {videoUrl && <QuestionSquaredIcon sx={{ width: 38, height: 40 }} />}
      </ModalHeader>
      <Stack sx={{ height: '100%' }}>
        <Stack mt={3} mb={5}>
          <Typography variant="h4" mb={1}>
            {title}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Stack>
        <Stack direction="column" sx={{ height: '100%' }}>
          {videoUrl ? (
            <iframe
              src={videoUrl}
              width={'100%'}
              height={'70%'}
              allowFullScreen
            ></iframe>
          ) : (
            children
          )}
        </Stack>
      </Stack>
    </ModalRight>
  );
}
