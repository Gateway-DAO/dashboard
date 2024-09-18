'use client';

import { useEffect } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import { usernameRegex } from '@/constants/username';
import { useMe } from '@/hooks/use-me';
import { auth } from '@/locale/en/auth';
import { clientApi, getAuthHeader } from '@/services/api/client';
import { handleError } from '@/utils/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialUsername: string;
  token: string;
};

const formSchema = z.object({
  username: z.string().regex(usernameRegex),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UsernameModal({
  isOpen,
  onClose,
  initialUsername,
  token,
}: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: initialUsername,
    },
  });

  useEffect(() => {
    reset({ username: initialUsername });
  }, [initialUsername]);

  const { mutateAsync, isPending } = clientApi.useMutation(
    'patch',
    '/accounts/me'
  );

  const { refetch } = useMe();

  const onSubmit = handleSubmit(async ({ username }) => {
    try {
      await mutateAsync({ body: { username }, headers: getAuthHeader(token) });
      await refetch();
      onClose();
    } catch (error) {
      setError('username', {
        message: handleError(error, 'Failed to update username'),
      });
    }
  });

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={onSubmit}>
        <DialogTitle
          id="confirm-dialog-title"
          sx={{ minWidth: { xs: 200, md: 400 } }}
        >
          Edit username
        </DialogTitle>
        <DialogContent>
          <TextField
            id="username"
            label="Enter username"
            {...register('username')}
            error={!!errors.username}
            variant="outlined"
            margin="dense"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
            helperText={errors?.username?.message ?? auth.rules.create_username}
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
          <LoadingButton
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              flexGrow: 1,
            }}
            id="confirm-dialog"
            isLoading={isPending}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
