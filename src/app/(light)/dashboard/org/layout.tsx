import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import DashboardUserBottomBar from '../user/components/dashboard-user-bottom-bar';
import DashboardOrgDeveloperMenuListItems from './components/dashboard-org-developer-menu-list-items';
import DashboardOrgMenuListItems from './components/dashboard-org-menu-list-items';

export default function DashboardOrganizationLayout({
  children,
}: PropsWithChildren) {
  return (
    <DashboardLayout
      menuItems={<DashboardOrgMenuListItems />}
      secondMenuItems={<DashboardOrgDeveloperMenuListItems />}
      mobileMenuItems={<DashboardUserBottomBar />}
    >
      {children}
    </DashboardLayout>
  );
}
