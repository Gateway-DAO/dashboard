import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';

import { Stack } from '@mui/material';

import EditAvatar from './components/edit-avatar/edit-avatar';
import EditUsername from './components/edit-username/edit-username';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Gateway ID - Gateway',
  };
}

export default async function SettingPage() {
  return (
    <>
      <TitleLayout
        titleId="settings-title"
        title="Gateway ID"
        subtitle="Edit your Gateway ID and manage your connected wallet"
      />

      <Stack spacing={3} alignItems="stretch">
        <Stack
          width={591}
          height="auto"
          bgcolor="primary.light"
          padding={2}
          borderRadius={1.2}
          gap={4}
        >
          <EditAvatar />
          <EditUsername />
        </Stack>
      </Stack>
    </>
  );
}
