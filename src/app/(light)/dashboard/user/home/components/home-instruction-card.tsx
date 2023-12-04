'use client';

import { Button, Paper, Stack, Typography, Link } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import QuestionSquaredIcon from '@/components/icons/question-squared';
import { useToggle } from '@react-hookz/web';
import Instrunction from '../../../components/sidebar/instruction/instruction';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  description: string;
  link: string;
  index: number;
  play_video: string;
};

export default function HomeInstructionCard({
  title,
  description,
  link,
  index,
  play_video,
}: Props) {
  const [openVideoPlayer, toggleVideoPlayer] = useToggle(false);
  const [open, setOpen] = useState(false);
  let hasSeenDialog: { [key: string]: boolean } | null;

  useEffect(() => {
    hasSeenDialog = JSON.parse(
      localStorage.getItem(title.toLowerCase()) || '{}'
    );
  }, []);

  useEffect(() => {
    if (hasSeenDialog && !hasSeenDialog.hasOwnProperty(title)) {
      setOpen(true);
    }
  }, []);

  const handleClick = () => {
    const updatedDialog = { ...hasSeenDialog, [title]: true };

    localStorage.setItem(title.toLowerCase(), JSON.stringify(updatedDialog));
    setOpen(false);
  };
  return (
    open && (
      <Paper
        variant="outlined"
        sx={{
          padding: 2,
          paddingLeft: 2,
          width: '100%',
          marginTop: 2,
          mr: 1,
          textDecoration: 'none',
          '&:last-child': { mr: 0 },
          backgroundColor: '#69DCED33',
        }}
      >
        <Stack flexDirection={'column'} justifyContent={'space-between'}>
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <QuestionSquaredIcon sx={{ width: 45, height: 40, mb: 2 }} />
            <CloseIcon sx={{ mt: 1 }} onClick={handleClick} />
          </Stack>
          <Stack>
            <Typography mt={2} variant="h5" width={300} gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" width={300} gutterBottom sx={{ mb: 2 }}>
              {description}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              color="info"
              onClick={toggleVideoPlayer}
            >
              {play_video}
            </Button>
          </Stack>
        </Stack>
        <Instrunction
          description={description}
          title={title}
          link={link}
          onClose={toggleVideoPlayer}
          open={openVideoPlayer}
        />
      </Paper>
    )
  );
}
