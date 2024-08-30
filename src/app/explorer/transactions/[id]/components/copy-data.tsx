import { limitChars } from '@/utils/string';
import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { IconButton, Stack, useMediaQuery } from '@mui/material';

export default function CopyData({
  text,
  showWholeString = false,
}: {
  text: string;
  showWholeString?: boolean;
}) {
 
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
      {showWholeString ? text : limitChars(text, 47)}

      <IconButton onClick={() => copy(text)}>
        <ContentCopy
          sx={{
            fontSize: 16,
            color: 'text.disabled',
            ml: showWholeString ? 14.5 : 0,
          }}
        />
      </IconButton>
    </Stack>
  );
}
