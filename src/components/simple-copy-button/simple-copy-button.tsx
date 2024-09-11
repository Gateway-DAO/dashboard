import { limitChars } from '@/utils/string';
import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { IconButton, IconButtonProps, Stack } from '@mui/material';

export default function SimpleCopyButton({
  text,
  ...props
}: { text: string } & Omit<IconButtonProps, 'onClick'>) {
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
    <IconButton onClick={() => copy(text)} {...props}>
      <ContentCopy
        sx={{
          fontSize: 16,
          color: 'text.disabled',
        }}
      />
    </IconButton>
  );
}
