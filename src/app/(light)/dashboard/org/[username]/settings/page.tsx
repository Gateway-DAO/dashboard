import TitleLayout from '@/components/title-layout/title-layout';
import { orgSettings } from '@/locale/en/settings';

import DisplayFields from './components/display-fields';

export default function OrganizationSettings() {
  return (
    <>
      <TitleLayout
        titleId="settings-title"
        title={orgSettings.title}
        subtitle={orgSettings.subtitle}
      />
      <DisplayFields />
    </>
  );
}
