import Loading from '@/components/loadings/loading/loading';
import { auth } from '@/locale/en/auth';
import { common } from '@/locale/en/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDisconnect } from 'wagmi';

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
        {(step === 'signing' || step === 'loading') && (
          <CircularProgress size={32} />
        )}
        {step === 'success' && (
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
        {isError ||
          (step === 'success' && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></Box>
          ))}
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
