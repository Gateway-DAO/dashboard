'use client';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { PublicACL } from '@/services/api/models';
import { limitChars, limitCharsOffset } from '@/utils/string';
import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Typography, Stack } from '@mui/material';

// TODO: Unify Copy Buttons

export default function Access({ address, roles, solana_address }: PublicACL) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar('Copied Successfully!');
    } catch (err) {
      enqueueSnackbar('Unexpected error', { variant: 'error' });
    }
  };

  // Join roles with ', ', but on last element, join with ' and '
  const rolesString = roles?.reduce((acc, role, index) => {
    if (index === 0) return role;
    if (index === roles.length - 1) return `${acc} and ${role}`;
    return `${acc}, ${role}`;
  }, '');

  return (
    <>
      <Box>
        <GTWAvatar name={address} alt={solana_address ?? address} size={45} />
      </Box>
      <Stack direction={'column'} alignItems={'flex-start'} width="100%">
        <Typography component="span" variant="subtitle1" color="text.primary">
          {limitChars(solana_address!, 10) ?? limitCharsOffset(address!, 4, 5)}
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
            {limitCharsOffset(address!, 4, 5)}
          </Typography>
          <IconButton onClick={() => copy(address!)}>
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
      <Typography
        variant="caption"
        color="text.secondary"
        align="right"
        flexShrink={0}
      >
        Can {rolesString}
      </Typography>
    </>
  );
}
