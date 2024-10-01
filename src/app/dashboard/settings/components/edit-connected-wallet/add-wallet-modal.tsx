import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { clientApi, getAuthHeader } from '@/services/api/client';
import { handleError } from '@/utils/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import { walletSchema } from './schema';

type AddWalletModalProps = {
  isOpen: boolean;
  token: string;
  onClose: () => void;
};

const formSchema = z.object({
  address: walletSchema,
});

type FormSchema = z.infer<typeof formSchema>;

export default function AddWalletModal({
  isOpen,
  token,
  onClose,
}: AddWalletModalProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { data: session, update } = useSession();

  const { mutateAsync, isPending } = clientApi.useMutation(
    'post',
    '/accounts/me/wallets'
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isOpen) {
      console.log('open');
      reset();
    }
  }, [isOpen]);

  const onSubmit = async ({ address }: FormSchema) => {
    if (!session || isPending) return;
    try {
      const userAlreadyHasWallet = session.user.wallet_addresses.some(
        (wallet) => wallet.address === address
      );

      if (userAlreadyHasWallet) {
        throw new Error(
          'You already have this wallet associated to your account'
        );
      }

      const account = await mutateAsync({
        body: { address },
        headers: getAuthHeader(token),
      });
      await update({
        user: account,
      });
      enqueueSnackbar('Wallet added');
      onClose();
    } catch (error) {
      if ((error as any)?.error?.includes("can't be added")) {
        setError('address', {
          message: "Can't add this wallet",
        });
        return;
      }
      setError('address', {
        message: handleError(error, 'Failed to add new wallet'),
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-wallet-modal"
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          id="add-wallet-modal-title"
          sx={{ minWidth: { xs: 200, md: 400 } }}
        >
          Add wallet
        </DialogTitle>
        <DialogContent>
          <TextField
            id="wallet-address"
            label="Wallet address"
            variant="outlined"
            margin="dense"
            fullWidth
            {...register('address')}
            error={!!errors.address}
            helperText={errors?.address?.message}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            color="primary"
            sx={{
              flexGrow: 1,
            }}
            id="cancel-dialog"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              flexGrow: 1,
            }}
            id="add-wallet-modal"
            disabled={isPending}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
