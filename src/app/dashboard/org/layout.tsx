import { PropsWithChildren } from 'react';



import DashboardLayout from '../components/dashboard-layout';
import DashboardUserBottomBar from '../user/components/dashboard-user-bottom-bar';
import DashboardOrgMenuListItems from './components/dashboard-org-menu-list-items';

export default function DashboardOrganizationLayout({
  children,
}: PropsWithChildren) {

  return <DashboardLayout
    menuItems={<DashboardOrgMenuListItems />}
    mobileMenuItems={<DashboardUserBottomBar />}
  >{children}</DashboardLayout>;
}
