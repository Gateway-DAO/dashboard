'use client';
import { useSnackbar } from 'notistack';

export default function useCopy() {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar('Text Copied Successfully');
    } catch (err) {
      enqueueSnackbar(
        `There was an unexpected error, please, contact Gateway or try again.`,
        { variant: 'error' }
      );
    }
  };

  return copy;
}
