'use client';
import { usePathname } from 'next/navigation';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import routes from '@/constants/routes';

export function Tabs({ value }: { value?: string }) {
  return (
    <GTWTabs value={value}>
      <GTWTab
        label="Created"
        href={routes.dashboard.myDataModels}
        value={routes.dashboard.myDataModels}
      />
      <GTWTab
        label="Network"
        href={routes.dashboard.networkDataModels}
        value={routes.dashboard.networkDataModels}
      />
    </GTWTabs>
  );
}

export function ConnectedTabs() {
  const pathname = usePathname();
  return <Tabs value={pathname} />;
}
