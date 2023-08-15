import { PropsWithChildren, ReactNode } from 'react';

import { WalletIcon } from '@/components/icons/wallet';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Stack } from '@mui/system';

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
    <Stack direction={'row'}>
      <Sidebar menuItems={menuItems} />
      <Stack>
        <Stack>
          <h1>Dashboard</h1>
          {content}
        </Stack>
        {children}
      </Stack>
    </Stack>
  );
}
