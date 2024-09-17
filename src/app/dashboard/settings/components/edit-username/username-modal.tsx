'use client';

import ConfirmDialog from '@/components/modal/confirm-dialog/confirm-dialog';
import { auth } from '@/locale/en/auth';

import { InputAdornment, TextField } from '@mui/material';

type Props = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export default function UsernameModal({ isOpen, setOpen }: Props) {
  return (
    <ConfirmDialog
      title="Edit username"
      positiveAnswer="Save"
      negativeAnswer="Cancel"
      onConfirm={() => console.log('submitted')}
      open={isOpen}
      setOpen={setOpen}
      maxWidth="sm"
    >
      <TextField
        id="username"
        label="Enter Username"
        variant="outlined"
        margin="dense"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
        helperText={auth.rules.create_username}
      />
    </ConfirmDialog>
  );
}
