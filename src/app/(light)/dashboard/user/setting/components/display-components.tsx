'use client';

import { useSession } from 'next-auth/react';

import { Stack } from '@mui/material';

import { EditConnectedWallet } from './edit-connected-wallet';
import { EditProfileCard } from './edit-profile-card/edit-profile-card';

export default function DisplayComponents() {
  const { data: session } = useSession();
  return (
    <Stack spacing={3} alignItems="stretch">
      <EditProfileCard />
      <EditConnectedWallet />
    </Stack>
  );
}
