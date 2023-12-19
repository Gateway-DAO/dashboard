import { PropsWithChildren } from 'react';

import DashboardLayout from '../layouts/dashboard-layout';
import DashboardUserBottomBar from './components/dashboard-user-bottom-bar';
import DashboardUserDeveloperMenuListItems from './components/dashboard-user-developer-menu-list-items';
import DashboardUserMenuListItems from './components/dashboard-user-menu-list-items';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <DashboardLayout
      menuItems={<DashboardUserMenuListItems />}
      secondMenuItems={<DashboardUserDeveloperMenuListItems />}
      mobileMenuItems={<DashboardUserBottomBar />}
    >
      {children}
    </DashboardLayout>
  );
}
