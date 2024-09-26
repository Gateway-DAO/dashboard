'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import { usernameRegex } from '@/constants/username';
import { auth } from '@/locale/en/auth';
import { clientApi, getAuthHeader } from '@/services/api/client';
import { formatTimeUntilAvailable } from '@/utils/date';
import { handleError } from '@/utils/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialUsername: string;
  token: string;
  lastUpdated?: string;
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
  lastUpdated,
}: Props) {
  const { update } = useSession();
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

  const onSubmit = handleSubmit(async ({ username }) => {
    try {
      const newUser = await mutateAsync({
        body: { username },
        headers: getAuthHeader(token),
      });
      onClose();
      await update({ user: newUser });
    } catch (error) {
      setError('username', {
        message: handleError(error, 'Failed to update username'),
      });
    }
  });

  const isAvailableToEdit = useMemo(() => {
    if (!lastUpdated) return true;
    const now = new Date();
    const updatedAt = new Date(lastUpdated);
    const diff = now.getTime() - updatedAt.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    return diffInDays > 30;
  }, [lastUpdated]);

  const helperText = useMemo(() => {
    if (!isAvailableToEdit) {
      return `You can change your username ${formatTimeUntilAvailable(
        lastUpdated,
        30
      )}`;
    }
    return errors?.username?.message ?? auth.rules.create_username;
  }, [isAvailableToEdit, lastUpdated]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-username-modal"
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={onSubmit}>
        <DialogTitle
          id="edit-username-modal-title"
          sx={{ minWidth: { xs: 200, md: 400 } }}
        >
          Edit username
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pb: 1 }}>
            You can only change your username once every 30 days
          </DialogContentText>
          <TextField
            id="username"
            label="Enter username"
            {...register('username')}
            error={!!errors.username || !isAvailableToEdit}
            variant="outlined"
            margin="dense"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
            helperText={helperText}
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
            id="edit-username-modal"
            disabled={!isAvailableToEdit}
            isLoading={isPending}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
