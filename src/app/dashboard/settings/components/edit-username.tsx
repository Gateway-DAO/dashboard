'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import ConfirmDialog from '@/components/modal/confirm-dialog/confirm-dialog';
import useCopy from '@/hooks/use-copy';
import { auth } from '@/locale/en/auth';
import { limitCharsCentered } from '@/utils/string';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { InputAdornment, Skeleton, Stack, TextField } from '@mui/material';
import { Button, Typography } from '@mui/material';

export default function EditUsername() {
  const { data: session } = useSession();

  const [isEditUsernameDialog, setEditUsernameDialog] =
    useState<boolean>(false);
  const copy = useCopy();

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack>
          <Typography variant="h5" color={'primary.dark'}>
            {session?.user.username ?? <Skeleton variant="text" width={150} />}
          </Typography>
          <Stack
            component={Typography}
            variant="caption"
            color={'primary.dark'}
            direction={'row'}
            columnGap={1}
            alignItems={'center'}
            onClick={() => copy(session?.user.did)}
          >
            {session?.user.did ? (
              limitCharsCentered(session?.user.did, 16)
            ) : (
              <Skeleton variant="text" width={200} />
            )}
            <ContentCopyIcon fontSize="inherit" />
          </Stack>
        </Stack>
        <Stack>
          <Button
            variant="outlined"
            onClick={() => setEditUsernameDialog(true)}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
      <ConfirmDialog
        title="Edit username"
        positiveAnswer="save"
        negativeAnswer="cancel"
        onConfirm={() => console.log('submitted')}
        open={isEditUsernameDialog}
        setOpen={setEditUsernameDialog}
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
    </>
  );
}
