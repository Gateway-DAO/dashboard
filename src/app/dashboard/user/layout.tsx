import { PropsWithChildren } from 'react';

import { WalletIcon } from '@/components/icons/wallet';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import DashboardLayout from '../components/dashboard-layout';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  const menuItems = [
    {
      name: 'My data assets',
      link: '/dashboard',
      icon: <WalletIcon />,
    },
    {
      name: 'Activity',
      link: '/activity',
      icon: <AccessTimeIcon />,
    },
    {
      name: 'Notifications',
      link: '/notifications',
      icon: <NotificationsNoneIcon />,
    },
  ];
  return (
    <DashboardLayout
      menuItems={menuItems}
    >
      {children}
    </DashboardLayout>
  );
}
