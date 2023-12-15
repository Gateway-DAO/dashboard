'use client';
import QuestionSquaredIcon from '@/components/icons/question-squared';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';

import { Stack, Typography } from '@mui/material';

import styles from './styles.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description: string;
  handleClick: () => void;
  onSideDialogClose?: () => void;
};

export default function SideBarVideoInstruction({
  open,
  videoUrl,
  title,
  description,
  onClose,
  handleClick,
  onSideDialogClose,
}: Props) {
  function sideBarClose() {
    onClose();
    handleClick();
    if (onSideDialogClose) {
      onSideDialogClose();
    }
  }

  return (
    <ModalRight open={open} onClose={sideBarClose}>
      <ModalHeader onClose={sideBarClose}>
        <QuestionSquaredIcon sx={{ width: 38, height: 40 }} />
      </ModalHeader>
      <Stack sx={{ height: '100%' }}>
        <Stack mt={3} mb={5} sx={{ height: '100%' }}>
          <Typography variant="h4" mb={1}>
            {title}
          </Typography>

          <Typography variant="body1">{description}</Typography>
        </Stack>
        <div className={styles.container}>
          <iframe
            id="ytplayer"
            width="550"
            height="309"
            src={
              videoUrl +
              '?controls=0&loop=1&modestbranding=1&playsinline=1&color=white&iv_load_policy=3'
            }
          ></iframe>
        </div>
      </Stack>
    </ModalRight>
  );
}
