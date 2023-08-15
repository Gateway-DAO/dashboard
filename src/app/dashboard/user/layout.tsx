import { PropsWithChildren } from 'react';

import { SquaredArrowDown } from '@/components/icons/squared-arrow-down';
import { SquaredArrowRight } from '@/components/icons/squared-arrow-right';
import { WalletIcon } from '@/components/icons/wallet';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import DashboardLayout from '../components/dashboard-layout';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  const menuItems = [
    {
      name: 'Home',
      link: '/',
      icon: HomeOutlinedIcon,
    },
    {
      name: 'Issued data assets',
      link: '/issued',
      icon: SquaredArrowRight,
    },
    {
      name: 'Data requests',
      link: '/user/data-requests',
      icon: SquaredArrowDown,
    },
    {
      name: 'My data assets',
      link: '/dashboard',
      icon: WalletIcon,
    },
    {
      name: 'Activity',
      link: '/activity',
      icon: AccessTimeIcon,
    },
    {
      name: 'Notifications',
      link: '/notifications',
      icon: NotificationsNoneIcon,
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
