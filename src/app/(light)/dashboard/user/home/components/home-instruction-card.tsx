'use client';

import QuestionSquaredIcon from '@/components/icons/question-squared';
import Instruction from '@/components/instruction/instruction';
import useHelpCard from '@/hooks/use-help-card';
import { useToggle } from '@react-hookz/web';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Paper, Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  description: string;
  link: string;
  play_video: string;
};

export default function HomeInstructionCard({
  title,
  description,
  link,
  play_video,
}: Props) {
  const [openVideoPlayer, toggleVideoPlayer] = useToggle(false);

  const { visible, onRemoveStorage } = useHelpCard({
    storageKey: title.toLowerCase(),
  });

  return (
    <Paper
      variant={'outlined'}
      sx={{
        padding: 2,
        paddingLeft: 2,
        width: '100%',
        marginTop: 2,
        mr: 1,
        textDecoration: 'none',
        '&:last-child': { mr: 0 },
        backgroundColor: visible ? '#69DCED33' : '#f6f4f9',
        border: visible ? 1 : 0,
        borderColor: '#69DCED33',
      }}
    >
      {visible && (
        <>
          <Stack flexDirection={'column'} justifyContent={'space-between'}>
            <Stack flexDirection={'row'} justifyContent={'space-between'}>
              <QuestionSquaredIcon sx={{ width: 45, height: 40, mb: 2 }} />
              <CloseIcon
                sx={{ mt: 1, cursor: 'pointer' }}
                onClick={onRemoveStorage}
              />
            </Stack>
            <Stack>
              <Typography mt={2} variant="h5" width={300} gutterBottom>
                {title}
              </Typography>
              <Typography
                variant="body2"
                width={300}
                gutterBottom
                sx={{ mb: 2 }}
              >
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
          <Instruction
            description={description}
            title={title}
            link={link}
            onClose={toggleVideoPlayer}
            open={openVideoPlayer}
          />
        </>
      )}
    </Paper>
  );
}
