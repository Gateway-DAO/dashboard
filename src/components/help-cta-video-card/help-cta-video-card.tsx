'use client';

import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Card,
} from '@mui/material';

import QuestionSquaredIcon from '../icons/question-squared';
import VideoSquaredIcon from '../icons/video-squared';

type Props = {
  title: string;
  desc: string;
  onClickVideo: () => void;
  btnText: string;
};

export default function HelpCtaVideoCard({
  title,
  desc,
  onClickVideo,
  btnText,
}: Props) {
  const [open, setOpen] = useState(false);
  let hasSeenDialog: { [key: string]: boolean } | null;

  useEffect(() => {
    hasSeenDialog = JSON.parse(
      localStorage.getItem('help-cta-video-how-to-use-pda') || '{}'
    );
  }, []);

  useEffect(() => {
    if (hasSeenDialog && !hasSeenDialog.hasOwnProperty(title)) {
      setOpen(true);
    }
  }, []);

  const handleClick = () => {
    const updatedDialog = { ...hasSeenDialog, [title]: true };
    localStorage.setItem(
      'help-cta-video-how-to-use-pda',
      JSON.stringify(updatedDialog)
    );
    setOpen(false);
  };

  return (
    open && (
      <Stack
        component={Card}
        position={'relative'}
        onClick={onClickVideo}
        sx={{
          mb: 3,
          p: 2,
          boxShadow: 'none',
          width: '100%',
          justifyContent: 'space-between',
          backgroundColor: '#69DCED26',
          cursor: 'pointer',
        }}
      >
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClick();
          }}
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          <CloseIcon />
        </IconButton>
        <QuestionSquaredIcon sx={{ width: 40, height: 40, mb: 1 }} />
        <Stack
          alignItems="stretch"
          gap={2}
          sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}
        >
          <Stack width="100%">
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
              {desc}
            </Typography>
            <Box>
              <Button variant="outlined" color="info">
                {btnText}
              </Button>
            </Box>
          </Stack>
          <Box>
            <VideoSquaredIcon
              sx={{
                width: { xs: '100%', md: 220 },
                height: { xs: 'auto', md: 128 },
              }}
            />
          </Box>
        </Stack>
      </Stack>
    )
  );
}
