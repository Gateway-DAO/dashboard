import { limitCharsOffset } from '@/utils/string';
import { ContentCopy } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

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
      <span>{text}</span>

      <Typography
        component="span"
        variant="caption"
        fontWeight={400}
        fontSize={12}
        color="text.secondary"
        lineHeight={1}
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {limitCharsOffset(String(text), 19, 5)}
      </Typography>
      <IconButton onClick={() => copy(String(text))}>
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