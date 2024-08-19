'use client';

import { Stack } from '@mui/material';

import { EditConnectedWallet } from './edit-connected-wallet';
import { EditProfileCard } from './edit-profile-card/edit-profile-card';

export default function DisplayComponents() {
  return (
    <Stack spacing={3} alignItems="stretch">
      <EditProfileCard />
      <EditConnectedWallet />
    </Stack>
  );
}
