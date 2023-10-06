'use client';

import { Chain } from '@/services/protocol/types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import EvmWalletConnect from './evm-wallet-connect';
import SolanaWalletConnect from './solana-wallet-connect';

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onConnect: (address: string, chain: Chain) => void;
  onCancel: () => void;
};

export default function WalletConnectModal({
  title,
  description,
  isOpen,
  onConnect,
  onCancel,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={() => onCancel()}>
      <DialogTitle id="title-modal" sx={{ textAlign: 'left', mt: 1 }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ maxWidth: 444 }}>
        <Typography variant="body1">{description}</Typography>
        <Stack mt={2.5}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Choose chain
          </Typography>
          <Stack
            direction="row"
            flex={1}
            gap={1}
            sx={{ zIndex: 10, position: 'relative' }}
          >
            {isOpen && (
              <>
                <EvmWalletConnect onConnect={onConnect} onClose={onCancel} />
                <SolanaWalletConnect onConnect={onConnect} />
              </>
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          px: 4,
        }}
      >
        <Button onClick={onCancel} size="medium" fullWidth variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
