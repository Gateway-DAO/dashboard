import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import MenuBottomListItems from './components/menu-bottom-list-items';
import MenuListItems from './components/menu-list-items';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardLayout
        menuItems={<MenuListItems />}
        mobileMenuItems={<MenuBottomListItems />}
      >
        {children}
      </DashboardLayout>
    </>
  );
}
