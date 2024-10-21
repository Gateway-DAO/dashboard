'use client';
import { useSession } from 'next-auth/react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { authApi } from '@/services/api/api';
import { PublicACL } from '@/services/api/models';
import { limitCharsOffset } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, ListItem, Skeleton } from '@mui/material';
import { Typography, Stack } from '@mui/material';

import AccessSkeleton from './access-skeleton';

// TODO: Unify Copy Buttons

export default function Access({ roles, did }: PublicACL) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const { isLoading, data: user } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['account', session?.token, did],
    queryFn: async () => {
      const { data } = await authApi(session!.token).GET('/accounts/{did}', {
        params: { path: { did: did! } },
      });
      return data;
    },
    enabled: !!did && !!session?.token,
  });

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
    <ListItem
      component={Stack}
      direction="row"
      alignItems="center"
      sx={{
        px: {
          xs: 0,
          lg: 4,
        },
      }}
      gap={2}
    >
      <Box>
        {isLoading ? (
          <Skeleton variant="circular" width={45} height={45} />
        ) : (
          <GTWAvatar
            name={did}
            src={user?.profile_picture}
            alt={user?.username}
            size={45}
          />
        )}
      </Box>
      <Stack direction="column" alignItems="flex-start" width="100%">
        <Typography component="span" variant="subtitle1" color="text.primary">
          {user?.username ?? (
            <Skeleton variant="text" width={140} height={28} />
          )}
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
            {limitCharsOffset(did!, 4, 5)}
          </Typography>
          <IconButton onClick={() => copy(did!)}>
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
    </ListItem>
  );
}
