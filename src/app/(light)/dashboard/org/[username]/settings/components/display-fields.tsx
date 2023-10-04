'use client';

import { useSession } from 'next-auth/react';

import { Stack } from '@mui/material';

import DisplayFieldsSkeletons from './display-fields/skeletons';
import Username from './display-fields/username/username';

export default function DisplayFields() {
  const { data: session } = useSession();
  return (
    <>
      <Stack gap={3} alignItems="stretch">
        {!session ? (
          <DisplayFieldsSkeletons />
        ) : (
          <>
            {/* <Avatar />
            <DisplayName /> */}
            <Username />
          </>
        )}
      </Stack>
    </>
  );
}
