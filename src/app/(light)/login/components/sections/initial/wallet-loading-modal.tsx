import Loading from '@/components/loadings/loading/loading';
import { auth } from '@/locale/en/auth';
import { common } from '@/locale/en/common';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Box,
  Button,
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
      <DialogTitle id="wallet-loading-modal-title">{locale?.title}</DialogTitle>
      <DialogContent>
        {isError ? (
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
        ) : (
          <Loading marginTop={0} />
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
