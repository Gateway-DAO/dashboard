import { useState } from 'react';

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
  onCancel: () => void;
  isAddWallet?: boolean;
};

export default function WalletConnectModal({
  title,
  description,
  isOpen,
  onCancel,
  isAddWallet = false,
}: Props) {
  const [evmIsLoading, setEvmIsLoading] = useState(false);
  return (
    <Dialog open={isOpen} onClose={() => onCancel()}>
      <DialogTitle id="title-modal" sx={{ textAlign: 'left' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{description}</Typography>
        <Stack mt={4}>
          <Typography variant="subtitle1">Choose chain</Typography>
          <Stack
            direction="row"
            flex={1}
            gap={1}
            sx={{ zIndex: 10, position: 'relative' }}
          >
            <EvmWalletConnect
              onClose={onCancel}
              isEvmLoading={setEvmIsLoading}
              isAddWallet={isAddWallet}
            />
            <SolanaWalletConnect onClose={onCancel} isAddWallet={isAddWallet} />
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
