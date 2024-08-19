import { limitCharsOffset } from '@/utils/string';
import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';

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
    <Stack
      component="span"
      direction="row"
      alignItems="center"
      lineHeight={1}
      justifyContent="flex-start"
    >
      {limitCharsOffset(text, 4, 4)}

      <IconButton onClick={() => copy(text)}>
        <ContentCopy
          sx={{
            fontSize: 16,
            color: 'text.disabled',
          }}
        />
      </IconButton>
    </Stack>
  );
}
