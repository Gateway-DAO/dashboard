'use client';

import QuestionSquaredIcon from '@/components/icons/question-squared';
import VideoSquaredIcon from '@/components/icons/video-squared';
import { useToggle } from '@react-hookz/web';
import { useLocalStorageValue } from '@react-hookz/web';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Card,
} from '@mui/material';

import SideBarVideoInstruction from './side-bar-video';

type Props = {
  id: string;
  title: string;
  desc: string;
  btnLink: string;
  btnText: string;
  videoUrl: string;
  onSideDialogClose?: () => void;
};

export function InstructionGuide({
  id,
  title,
  desc,
  btnLink,
  btnText,
  videoUrl,
  onSideDialogClose,
}: Props) {
  const { value: coachMark, set: setCoachMark } = useLocalStorageValue<{
    [key: string]: boolean;
  } | null>('coach-mark-guide');
  const open = !coachMark?.[id];
  const [openVideoPlayer, toggleVideoPlayer] = useToggle(false);
  const handleClick = () => {
    setCoachMark({
      ...coachMark,
      [id]: true,
    });
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
          <Stack
            display="flex"
            justifyContent="space-between"
            marginTop={2}
            direction={'row'}
          >
            <Stack display="flex" direction="column">
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
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
            </Stack>
            <Box display={{ xs: 'none', md: 'inline' }}>
              <VideoSquaredIcon
                sx={{
                  width: { xs: '100%', md: 220 },
                  height: { xs: 'auto', md: 128 },
                }}
              />
            </Box>
          </Stack>
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
