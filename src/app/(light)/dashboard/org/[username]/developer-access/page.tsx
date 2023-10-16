import TitleLayout from '@/components/title-layout/title-layout';
import { developer_access } from '@/locale/en/developer-access';

import DeveloperPortal from '../../../user/settings/components/developer-portal/developer-portal';

export default async function OrgDeveloperAccessPage() {
  return (
    <>
      <TitleLayout
        titleId="developer-access-title"
        title={developer_access.title}
        subtitle={developer_access.subtitle}
      />
      <DeveloperPortal />
    </>
  );
}
