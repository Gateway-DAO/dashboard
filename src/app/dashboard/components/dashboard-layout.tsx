import { PropsWithChildren, ReactNode } from 'react';

import { WalletIcon } from '@/components/icons/wallet';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import Sidebar from './sidebar/sidebar';

type Props = {
  content: ReactNode;
};

export default function DashboardLayout({
  content,
  children,
}: PropsWithChildren<Props>) {
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
    <div>
      <Sidebar menuItems={menuItems} />
      <div>
        <h1>Dashboard</h1>
        {content}
      </div>
      {children}
    </div>
  );
}
