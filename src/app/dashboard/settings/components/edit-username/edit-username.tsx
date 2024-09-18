'use client';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import useCopy from '@/hooks/use-copy';
import { useMe } from '@/hooks/use-me';
import { limitCharsCentered } from '@/utils/string';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Skeleton, Stack } from '@mui/material';
import { Button, Typography } from '@mui/material';

import UsernameModal from './username-modal';

export default function EditUsername() {
  const { data: session } = useSession();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onClose = () => setModalOpen(false);

  const copy = useCopy();

  const { user, isPending } = useMe();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography variant="h5" color="primary.dark">
            {user?.username ?? <Skeleton variant="text" width={150} />}
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
        <Button
          variant="outlined"
          onClick={() => setModalOpen(true)}
          disabled={isPending}
        >
          Edit
        </Button>
      </Stack>
      {!isPending && user && session?.token && (
        <UsernameModal
          isOpen={isModalOpen}
          onClose={onClose}
          initialUsername={user.username!}
          token={session.token}
          lastUpdated={user.username_updated_at}
        ></UsernameModal>
      )}
    </>
  );
}
