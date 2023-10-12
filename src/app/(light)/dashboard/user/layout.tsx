import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import DashboardUserDeveloperMenuListItems from '../components/sidebar/dashboard-user-developer-menu-list-items';
import DashboardUserBottomBar from './components/dashboard-user-bottom-bar';
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
