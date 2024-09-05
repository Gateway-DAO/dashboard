'use client';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { limitChars, limitCharsOffset } from '@/utils/string';
import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Typography, Stack } from '@mui/material';

// TODO: Unify Copy Buttons

export default function UserData({
  username,
  did,
  role,
}: {
  username?: string;
  did: string;
  role: string;
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
    <>
      <Box>
        <GTWAvatar name={did} alt={username ?? did} size={45} />
      </Box>
      <Stack direction={'column'} alignItems={'flex-start'} width="100%">
        <Typography component="span" variant="subtitle1" color="text.primary">
          {limitChars(username!, 10) ?? limitCharsOffset(did, 4, 5)}
        </Typography>

        <Stack
          component="span"
          direction="row"
          alignItems="center"
          lineHeight={1}
          justifyContent="flex-start"
          gap={0.5}
        >
          <Typography
            component="span"
            variant="caption"
            fontWeight={400}
            color="text.secondary"
            lineHeight={1}
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {limitCharsOffset(did, 4, 5)}
          </Typography>
          <IconButton onClick={() => copy(did)}>
            <ContentCopy
              sx={{
                fontSize: 16,
                color: 'text.disabled',
                lineHeight: 1,
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <Typography variant="caption" color="text.secondary" align="right">
        {role}
      </Typography>
    </>
  );
}
