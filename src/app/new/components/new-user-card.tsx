import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import NewUserIcon from './new-user-icon';
import { useSession } from 'next-auth/react';

// TODO: Unify Copy Buttons

export default function NewUserCard() {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useSession();

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
      component={Paper}
      elevation={0}
      justifyContent="space-between"
      direction="row"
      gap={0.5}
      sx={{
        backgroundColor: 'primary.100',
        overflow: 'hidden',
      }}
    >
      <Stack justifyContent="space-between" gap={2} sx={{ p: 2 }}>
        <Typography variant="body2" color="primary.dark">
          Gateway ID
        </Typography>
        <Box>
          <Typography variant="h4" fontWeight="regular" color="primary.dark">
            {!data ? <Skeleton variant="text" /> : data.user.username}
          </Typography>
          {!data ? (
            <Skeleton variant="text" width={200} />
          ) : (
            <Stack direction="row" gap={0.5} alignItems="center">
              <Typography
                variant="body2"
                color="primary.dark"
                onClick={() => copy(data.user.did)}
              >
                {data.user.did}
              </Typography>
              <IconButton onClick={() => copy(data.user.did)}>
                <ContentCopy
                  sx={{
                    fontSize: 16,
                    color: 'primary.dark',
                  }}
                />
              </IconButton>
            </Stack>
          )}
        </Box>
      </Stack>
      <NewUserIcon
        sx={{
          height: '100%',
          alignSelf: 'flex-end',
          width: {
            xs: 100,
            sm: 200,
            lg: 250,
          },
          pt: {
            xs: 10,
            sm: 4,
          },
          opacity: {
            xs: 0.5,
            sm: 0.2,
          },
        }}
      />
    </Stack>
  );
}
