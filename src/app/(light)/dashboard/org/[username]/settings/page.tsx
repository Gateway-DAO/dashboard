import TitleLayout from '@/components/title-layout/title-layout';
import { orgSettings } from '@/locale/en/settings';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';

import { Divider } from '@mui/material';

import DisplayFields from './components/display-fields/display-fields';
import MembersArea from './components/members-area/members-area';

export default function OrganizationSettings() {
  return (
    <>
      <TitleLayout
        titleId="settings-title"
        title={orgSettings.title}
        subtitle={orgSettings.subtitle}
      />
      <DisplayFields />
      <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, my: 4 }} />
      <MembersArea />
    </>
  );
}
