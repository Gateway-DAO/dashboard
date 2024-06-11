import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import DashboardLayout from '../layouts/dashboard-layout';
import DashboardUserBottomBar from './components/dashboard-user-bottom-bar';
import DashboardUserMenuListItems from './components/dashboard-user-menu-list-items';

export const metadata: Metadata = {
  title: `The Private Data Asset Network  - Gateway Network`,
};

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <DashboardLayout
      menuItems={<DashboardUserMenuListItems />}
      secondMenuItems={null}
      mobileMenuItems={<DashboardUserBottomBar />}
    >
      {children}
    </DashboardLayout>
  );
}
