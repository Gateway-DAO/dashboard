import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import MenuItems, { MenuBottombarItems } from './components/menu-items';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardLayout
        menuItems={<MenuItems />}
        mobileMenuItems={<MenuBottombarItems />}
      >
        {children}
      </DashboardLayout>
    </>
  );
}
