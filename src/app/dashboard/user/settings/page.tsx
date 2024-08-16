import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';
import { settings } from '@/locale/en/settings';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';

import { Divider } from '@mui/material';

import ConnectedAccounts from './components/connected-accounts';
import DisplayFields from './components/display-fields';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Manage Gateway ID - Gateway Network',
  };
}

export default async function SettingsPage() {
  return (
    <>
      <TitleLayout
        titleId="settings-title"
        title={settings.title}
        subtitle={settings.subtitle}
      />
      <DisplayFields />
      <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, my: 4 }} />
      <ConnectedAccounts />
    </>
  );
}
