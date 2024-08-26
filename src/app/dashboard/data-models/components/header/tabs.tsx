'use client';
import { usePathname } from 'next/navigation';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';

export function Tabs({ value }: { value?: string }) {
  return (
    <GTWTabs value={value}>
      <GTWTab label={'Created'} href={'#'} />
      <GTWTab label={'Network'} href={'#'} />
    </GTWTabs>
  );
}

export function ConnectedTabs() {
  const pathname = usePathname();
  console.log(pathname);
  return <Tabs value={pathname} />;
}
