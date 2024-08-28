'use client';

import { auth } from '@/locale/en/auth';
import { useWalletConnectionStep } from '@/services/wallets/wallet-connection-provider';

import { CheckOutlined } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

type Props = {
  canClose?: boolean;
  onDisconnect: () => Promise<void>;
};

export default function WalletLoadingModal({
  onDisconnect,
  canClose = false,
}: Props) {
  const { step, error, onPending } = useWalletConnectionStep();

  const isError = step === 'error';

  const locale = step !== 'pending' ? auth.connection_modal[step] : undefined;

  const onClose = () => {
    if (isError || (canClose && step === 'success')) {
      onPending();
    }
  };

  return (
    <Dialog
      open={step !== 'pending'}
      onClose={onClose}
      fullWidth
      aria-labelledby="wallet-loading-modal-title"
      aria-describedby="wallet-loading-modal-description"
    >
      <DialogTitle id="wallet-loading-modal-title">
        {(step === 'signing' || step === 'loading') && (
          <CircularProgress size={32} />
        )}
        {(step === 'success' || step === 'signup') && (
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              color: 'action.active',
              width: 40,
              height: 40,
            }}
          >
            <CheckOutlined />
          </Avatar>
        )}
        {isError && (
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              color: 'action.active',
              width: 40,
              height: 40,
            }}
          >
            <ErrorOutlineIcon />
          </Avatar>
        )}
        <Typography
          component="span"
          sx={{
            display: 'block',
            mt: 1,
            fontSize: 'inherit',
            fontWeight: 'inherit',
          }}
        >
          {locale?.title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {(isError || step === 'success') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></Box>
        )}
        <DialogContentText id="wallet-loading-modal-description" sx={{ mt: 2 }}>
          {locale?.description}
          {error && (
            <Typography
              component="span"
              sx={{ display: 'block' }}
              color="error"
            >
              {error}
            </Typography>
          )}
        </DialogContentText>
      </DialogContent>
      {step === 'success' && canClose && (
        <DialogActions>
          <Button fullWidth variant="contained" onClick={onPending}>
            Close
          </Button>
        </DialogActions>
      )}
      {step === 'signing' && (
        <DialogActions>
          <Button fullWidth variant="contained" onClick={onDisconnect}>
            Disconnect
          </Button>
        </DialogActions>
      )}
      {isError && (
        <DialogActions>
          <Button fullWidth variant="contained" onClick={onPending}>
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
