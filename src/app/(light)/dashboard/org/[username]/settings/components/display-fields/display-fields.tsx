'use client';

import { useSession } from 'next-auth/react';

import { Stack } from '@mui/material';

import Avatar from './avatar';
import DisplayName from './display-name/display-name';
import DisplayFieldsSkeletons from './skeletons';
import Username from './username/username';

export default function DisplayFields() {
  const { data: session } = useSession();
  return (
    <>
      <Stack gap={3} alignItems="stretch">
        {!session ? (
          <DisplayFieldsSkeletons />
        ) : (
          <>
            <Avatar />
            <DisplayName />
            <Username />
          </>
        )}
      </Stack>
    </>
  );
}
