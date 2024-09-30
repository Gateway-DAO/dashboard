import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';

import { Stack } from '@mui/material';

import EditAvatar from './components/edit-avatar/edit-avatar';
import { EditConnectedWallet } from './components/edit-connected-wallet/edit-connected-wallet';
import EditUsername from './components/edit-username/edit-username';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Settings',
  };
}

export default async function SettingPage() {
  return (
    <>
      <TitleLayout
        titleId="settings-title"
        title="Settings"
        subtitle="Edit your Gateway ID and manage your connected wallets"
      />

      <Stack gap={3} alignItems="stretch">
        <Stack
          maxWidth={590}
          height="auto"
          bgcolor="primary.light"
          padding={2}
          borderRadius={1.2}
          gap={4}
        >
          <EditAvatar />
          <EditUsername />
        </Stack>
        <EditConnectedWallet />
      </Stack>
    </>
  );
}
