'use client';
import { useSnackbar } from 'notistack';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, ButtonProps } from '@mui/material';

type Props = {
  text: string;
  customButtonText?: string;
  sucessMessage?: string;
};

// TODO: Unify Copy Buttons

export default function CopyButton({
  text,
  customButtonText,
  sucessMessage = 'Copied to clipboard',
  ...props
}: Props & ButtonProps) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(sucessMessage);
    } catch (err) {
      enqueueSnackbar('Unexpected error', { variant: 'error' });
    }
  };

  return (
    <Button
      onClick={() => copy(text)}
      startIcon={<ContentCopyIcon />}
      variant="outlined"
      size="medium"
      {...props}
    >
      {customButtonText ?? 'Copy'}
    </Button>
  );
}
