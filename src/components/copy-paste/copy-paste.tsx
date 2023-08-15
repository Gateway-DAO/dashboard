'use client';
import { errorMessages } from '@/constants/error-messages';
import { limitCharsCentered } from '@/utils/string';
import { useSnackbar } from 'notistack';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Stack, Typography } from '@mui/material';

type Props = {
  text: string;
  sucessMessage?: string;
  limit?: number;
};

export default function CopyPaste({
  text,
  sucessMessage = 'Copied to clipboard',
  limit = 6,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(sucessMessage, { variant: 'error' });
    } catch (err) {
      enqueueSnackbar(errorMessages['UNEXPECTED_ERROR'], { variant: 'error' });
    }
  };

  return (
    <Stack
      component={Button}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
      title={text}
      onClick={() => copy(text)}
    >
      <Typography fontSize={12} sx={{ whiteSpace: 'nowrap' }}>
        {limitCharsCentered(text, limit)}
      </Typography>
      <ContentCopyIcon sx={{ fontSize: 16 }} />
    </Stack>
  );
}
