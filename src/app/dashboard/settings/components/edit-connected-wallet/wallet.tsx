'use client';
import { PropsWithChildren } from 'react';

import { useMenu } from '@/hooks/use-menu';
import { WalletAddress } from '@/services/api/models';

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
  onRemove,
  children,
}: PropsWithChildren<{ onRemove: () => void }>) {
  const { onOpen, onClose, element: anchorEl, isOpen } = useMenu();
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        {children}
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
          <MenuItem onClick={onRemove}>
            <ListItemIcon>
              <Close fontSize="small" />
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
  onRemove,
}: WalletAddress & Partial<{ onRemove: (address: string) => void }>) {
  const detail = (
    <Stack>
      <Typography variant="body1">{address}</Typography>
      <Typography variant="caption">{chain}</Typography>
    </Stack>
  );

  if (!onRemove) {
    return detail;
  }

  return (
    <RemovableWallet onRemove={() => onRemove(address)}>
      {detail}
    </RemovableWallet>
  );
}
