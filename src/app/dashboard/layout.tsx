import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import DashboardUserDeveloperMenuListItems from './components/dashboard-developer-menu-list-items';
import DashboardLayout from './components/dashboard-layout';
import DashboardUserMenuListItems from './components/dashboard-menu-list-items';

export const metadata: Metadata = {
  title: {
    template: '%s | Gateway Dashboard',
    default: 'Gateway Dashboard',
  },
};

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <DashboardLayout
      menuItems={<DashboardUserMenuListItems />}
      secondMenuItems={<DashboardUserDeveloperMenuListItems />}
    >
      {children}
    </DashboardLayout>
  );
}
