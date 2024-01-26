'use client';

import QuestionSquaredIcon from '@/components/icons/question-squared';
import InstructionGuideModalVideo from '@/components/instruction-guide/instruction-guide-modal-video';
import useLocalStorageInstructionGuide from '@/hooks/use-instruction-guide';
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

  const { visible, onRemoveStorage } = useLocalStorageInstructionGuide({
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
        cursor: 'pointer',
      }}
    >
      <>
        {visible && (
          <Stack
            sx={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: 184,
            }}
            onClick={toggleVideoPlayer}
          >
            <Stack
              flexDirection={'row'}
              justifyContent={'space-between'}
              height={40}
            >
              <QuestionSquaredIcon sx={{ width: 45, height: 40, mb: 2 }} />
              <CloseIcon
                sx={{
                  mt: 1,
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onRemoveStorage();
                }}
              />
            </Stack>
            <Stack flexGrow={1}>
              <Typography mt={2} variant="h5" width={300} gutterBottom>
                {title}
              </Typography>
              <Typography
                variant="body2"
                width={300}
                gutterBottom
                sx={{ mb: 2, flexGrow: 1 }}
              >
                {description}
              </Typography>
              <Button variant="outlined" size="small" color="info">
                {play_video}
              </Button>
            </Stack>
          </Stack>
        )}
      </>
      <InstructionGuideModalVideo
        description={description}
        title={title}
        videoUrl={link}
        onClose={() => {
          toggleVideoPlayer();
          onRemoveStorage();
        }}
        open={openVideoPlayer}
      />
    </Paper>
  );
}
