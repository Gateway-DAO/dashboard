import Loading from '@/components/loadings/loading/loading';
import { auth } from '@/locale/en/auth';
import { common } from '@/locale/en/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDisconnect } from 'wagmi';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
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

import { useWalletConnectionStep } from '../../../providers/wallet-connection-provider';
export default function WalletLoadingModal() {
  const { step, error, onPending } = useWalletConnectionStep();
  const { disconnect: solanaDisconnect } = useWallet();
  const { disconnectAsync: evmDisconnect } = useDisconnect();

  const onDisconnect = async () => {
    try {
      await Promise.all([solanaDisconnect(), evmDisconnect()]);
    } catch {
    } finally {
      onPending();
    }
  };

  const isError = step === 'error';

  const locale = step !== 'pending' ? auth.connection_modal[step] : undefined;

  return (
    <Dialog
      open={step !== 'pending'}
      onClose={isError ? onPending : undefined}
      fullWidth
      aria-labelledby="wallet-loading-modal-title"
      aria-describedby="wallet-loading-modal-description"
    >
      <DialogTitle id="wallet-loading-modal-title">
        {!isError && (
          <CircularProgress
            size={32}
            sx={{
              display: 'block',
              mb: 1,
            }}
          />
        )}
        {locale?.title}
      </DialogTitle>
      <DialogContent>
        {isError && (
          <Box
            key="error"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
          </Box>
        )}
        {step === 'loading' && <Loading marginTop={0} />}
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
      {step === 'signing' && (
        <DialogActions>
          <Button fullWidth variant="contained" onClick={onDisconnect}>
            {common.actions.disconnect}
          </Button>
        </DialogActions>
      )}
      {isError && (
        <DialogActions>
          <Button fullWidth variant="contained" onClick={onPending}>
            {common.actions.close}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
