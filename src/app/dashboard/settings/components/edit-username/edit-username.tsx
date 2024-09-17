'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import useCopy from '@/hooks/use-copy';
import { limitCharsCentered } from '@/utils/string';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Skeleton, Stack } from '@mui/material';
import { Button, Typography } from '@mui/material';

import UsernameModal from './username-modal';

export default function EditUsername() {
  const { data: session } = useSession();

  const [isEditUsernameDialog, setEditUsernameDialog] =
    useState<boolean>(false);
  const copy = useCopy();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography variant="h5" color="primary.dark">
            {session?.user.username ?? <Skeleton variant="text" width={150} />}
          </Typography>
          <Stack
            component={Typography}
            variant="caption"
            color="primary.dark"
            direction="row"
            columnGap={1}
            alignItems="center"
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
      <UsernameModal
        isOpen={isEditUsernameDialog}
        setOpen={setEditUsernameDialog}
      ></UsernameModal>
    </>
  );
}
