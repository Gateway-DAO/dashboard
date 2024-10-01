'use client';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useCallback } from 'react';

import { useMenu } from '@/hooks/use-menu';
import { clientApi, getAuthHeader } from '@/services/api/client';
import { WalletAddress } from '@/services/api/models';
import { useSnackbar } from 'notistack';

import { Close, MoreVert } from '@mui/icons-material';
import {
  Typography,
  Stack,
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Box,
} from '@mui/material';

export function WalletLoading() {
  return (
    <Stack>
      <Typography variant="body1">
        <Skeleton variant="text" width={200} />
      </Typography>
      <Typography variant="caption">
        <Skeleton variant="text" width={100} />
      </Typography>
    </Stack>
  );
}

function RemovableWallet({
  address,
  children,
}: PropsWithChildren<{ address: string }>) {
  const { onOpen, onClose, element: anchorEl, isOpen } = useMenu();

  const { mutateAsync, isPending } = clientApi.useMutation(
    'delete',
    '/accounts/me/wallets/{address}'
  );

  const { data: session, update } = useSession();

  const { enqueueSnackbar } = useSnackbar();

  const onRemove = useCallback(async () => {
    if (!session?.token) return;
    try {
      const res = await mutateAsync({
        params: { path: { address } },
        headers: getAuthHeader(session.token),
      });
      enqueueSnackbar('Wallet removed');
      onClose();
      update({ user: res });
    } catch (e) {
      enqueueSnackbar('Failed to remove wallet', { variant: 'error' });
    }
  }, [address, session?.token]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Box
          sx={{
            opacity: isPending ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {children}
        </Box>
        <IconButton onClick={onOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          id="wallet-detail"
          anchorEl={anchorEl}
          open={isOpen}
          onClose={onClose}
          MenuListProps={{
            'aria-labelledby': 'wallet-detail',
          }}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
        >
          <MenuItem
            disabled={isPending}
            onClick={!isPending ? onRemove : undefined}
          >
            <ListItemIcon>
              {isPending ? (
                <CircularProgress size="1em" />
              ) : (
                <Close fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>Remove wallet</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
    </>
  );
}

export default function Wallet({
  chain,
  address,
  removable,
}: WalletAddress & Partial<{ removable: boolean }>) {
  const detail = (
    <Stack>
      <Typography variant="body1">{address}</Typography>
      <Typography variant="caption">{chain}</Typography>
    </Stack>
  );

  if (!removable) {
    return detail;
  }

  return <RemovableWallet address={address}>{detail}</RemovableWallet>;
}
