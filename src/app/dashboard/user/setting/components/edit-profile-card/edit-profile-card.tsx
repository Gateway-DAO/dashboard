import { useState } from 'react';

import ConfirmDialog from '@/components/modal/confirm-dialog/confirm-dialog';
import { useSnackbar } from 'notistack';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { Button, Typography } from '@mui/material';

import EditAvatar from './components/edit-avatar/edit-avatar';

export function EditProfileCard() {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar('Text Copied Successfully');
    } catch (err) {
      enqueueSnackbar(
        `There was an unexpected error, please, contact Gateway or try again.`,
        { variant: 'error' }
      );
    }
  };
  const [isEditUsernameDialog, setEditUsernameDialog] =
    useState<boolean>(false);
  const onSubmit = async (profilePicture: Blob) => {
    console.log(profilePicture);
  };
  return (
    <>
      <Stack
        width={591}
        height="auto"
        bgcolor={'primary.light'}
        padding={2}
        borderRadius={1.2}
      >
        <EditAvatar name="profile-picture" id="pfp" onChange={onSubmit} />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack>
            <Typography variant="h5" color={'primary.dark'}>
              acme
            </Typography>
            <Stack
              component={Typography}
              variant="caption"
              color={'primary.dark'}
              direction={'row'}
              columnGap={1}
              alignItems={'center'}
              onClick={() => copy('did:gatewayid:0x02...626d6n')}
            >
              did:gatewayid:0x02...626d6n
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
          helperText={
            'Use only lowercase letters, numbers, and the “_” symbol.'
          }
        />
      </ConfirmDialog>
    </>
  );
}
