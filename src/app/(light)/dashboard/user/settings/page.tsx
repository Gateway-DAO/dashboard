import TitleLayout from '@/components/title-layout/title-layout';
import { settings } from '@/locale/en/settings';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';

import { Divider } from '@mui/material';

import ConnectedAccounts from './components/connected-accounts';
import DeveloperPortal from './components/developer-portal/developer-portal';
import DisplayFields from './components/display-fields';

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
      <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, my: 4 }} />
      <DeveloperPortal />
    </>
  );
}
