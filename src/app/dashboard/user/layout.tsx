import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import MenuItems from './components/menu-items';

export default function DashboardUserLayout({ children, ...props }: PropsWithChildren) {
  console.log('dashboar', props)
  return <DashboardLayout menuItems={<MenuItems />}>{children}</DashboardLayout>;
}
