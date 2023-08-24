import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import DashboardUserBottomBar from './components/dashboard-user-bottom-bar';
import MenuListItems from './components/dashboard-user-menu-list-items';

export default function DashboardUserLayout({ children }: PropsWithChildren) {

  return (
    <>
      <DashboardLayout
        menuItems={<MenuListItems />}
        mobileMenuItems={<DashboardUserBottomBar />}
      >
        {children}
      </DashboardLayout>
    </>
  );
}
