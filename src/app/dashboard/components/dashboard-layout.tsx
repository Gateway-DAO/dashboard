import { PropsWithChildren, ReactNode } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box } from '@mui/material';
import { Stack } from '@mui/system';

import DashboardPage from './dashboard-page';
import Logo from './logo/logo';
import Sidebar from './sidebar/sidebar';

type Props = {
  menuItems: ReactNode;
  mobileMenuItems: ReactNode;
};

export default function DashboardLayout({
  children,
  menuItems,
  mobileMenuItems,
}: PropsWithChildren<Props>) {
  return (
    <Stack direction={{
      xs: "column",
      lg: "row"
    }} alignItems="stretch" sx={{ minHeight: '100%' }}>
      <Sidebar menuItems={menuItems}>
        <Logo />
      </Sidebar>
      <DashboardPage>
        {children}
      </DashboardPage>
      {mobileMenuItems}
    </Stack>
  );
}
