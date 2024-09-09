'use client';

import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { IconButton } from '@mui/material';

// TODO: Unify copy buttons

export default function CopyData({ text }: { text: string }) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar('Copied Successfully!');
    } catch (err) {
      enqueueSnackbar('Unexpected error', { variant: 'error' });
    }
  };

  return (
    <IconButton onClick={() => copy(text)}>
      <ContentCopy
        sx={{
          fontSize: 16,
          color: 'text.disabled',
        }}
      />
    </IconButton>
  );
}
