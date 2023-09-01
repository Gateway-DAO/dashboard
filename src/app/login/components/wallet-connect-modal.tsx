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

require('@solana/wallet-adapter-react-ui/styles.css');

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onCancel: (value: boolean) => void;
};

export function WalletConnectModal({
  title,
  description,
  isOpen,
  onCancel,
}: Props) {
  const [evmIsLoading, setEvmIsLoading] = useState(false);
  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'left' }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{description}</Typography>
        <Stack mt={4}>
          <Typography variant="subtitle1">Choose Network</Typography>
          <Stack
            direction="row"
            flex={1}
            gap={1}
            sx={{ zIndex: 10, position: 'relative' }}
          >
            <EvmWalletConnect
              onFirstModal={onCancel}
              isEvmLoading={setEvmIsLoading}
            />
            {!evmIsLoading && <SolanaWalletConnect onFirstModal={onCancel} />}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onCancel(false)}
          size="medium"
          fullWidth
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
