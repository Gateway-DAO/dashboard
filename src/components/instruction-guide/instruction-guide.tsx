'use client';

import { useEffect, useState } from 'react';

import QuestionSquaredIcon from '@/components/icons/question-squared';
import VideoSquaredIcon from '@/components/icons/video-squared';
import { useToggle } from '@react-hookz/web';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack, Typography, IconButton, Card } from '@mui/material';

import SideBarVideoInstruction from './side-bar-video';

type Props = {
  title: string;
  desc: string;
  btnLink: string;
  btnText: string;
  videoUrl: string;
  onSideDialogClose?: () => void;
};

export function InstructionGuide({
  title,
  desc,
  btnLink,
  btnText,
  videoUrl,
  onSideDialogClose,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openVideoPlayer, toggleVideoPlayer] = useToggle(false);

  let hasSeenDialog: { [key: string]: boolean } | null;

  useEffect(() => {
    hasSeenDialog = JSON.parse(
      localStorage.getItem('coach-mark-guide') || '{}'
    );
  }, []);

  useEffect(() => {
    if (hasSeenDialog && !hasSeenDialog.hasOwnProperty(title)) {
      setOpen(true);
    }
  }, []);

  const handleClick = () => {
    const updatedDialog = { ...hasSeenDialog, [title]: true };

    localStorage.setItem('coach-mark-guide', JSON.stringify(updatedDialog));
    setOpen(false);
  };

  return (
    open && (
      <>
        <Stack
          component={Card}
          position={'relative'}
          sx={{
            mb: 3,
            p: 2,
            boxShadow: 'none',
            width: '100%',
            backgroundColor: '#69DCED26',
          }}
        >
          <IconButton
            onClick={handleClick}
            sx={{ position: 'absolute', top: 20, right: 20 }}
          >
            <CloseIcon />
          </IconButton>
          <QuestionSquaredIcon sx={{ width: 40, height: 40, mb: 1 }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
                {desc}
              </Typography>
              <span
                style={{
                  justifySelf: 'flex-end',
                }}
              >
                <Button
                  color="info"
                  size="medium"
                  variant="outlined"
                  href={btnLink}
                  onClick={toggleVideoPlayer}
                >
                  {btnText}
                </Button>
              </span>
            </div>
            <div style={{ marginRight: 15 }}>
              <VideoSquaredIcon
                sx={{
                  width: { xs: '100%', md: 220 },
                  height: { xs: 'auto', md: 128 },
                }}
              />
            </div>
          </div>
        </Stack>
        <SideBarVideoInstruction
          open={openVideoPlayer}
          videoUrl={videoUrl}
          title={title}
          description={desc}
          onClose={toggleVideoPlayer}
          handleClick={handleClick}
          onSideDialogClose={onSideDialogClose}
        />
      </>
    )
  );
}
