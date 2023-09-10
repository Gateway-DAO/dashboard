'use client';
import { errorMessages } from '@/locale/en/errors';
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
  sucessMessage = 'Copied to clipboard', // TODO: Add locale
  limit = 6,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(sucessMessage);
    } catch (err) {
      enqueueSnackbar(errorMessages.UNEXPECTED_ERROR, { variant: 'error' });
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
      <Typography sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
        {limitCharsCentered(text, limit)}
      </Typography>
      <ContentCopyIcon
        sx={{ fontSize: 'body1.fontSize', color: 'text.disabled' }}
      />
    </Stack>
  );
}
