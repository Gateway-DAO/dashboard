import { PropsWithChildren, ReactNode } from 'react';

import { Stack } from '@mui/system';

import DashboardPage from './dashboard-page';
import Logo from './logo/logo';
import Sidebar from './sidebar/sidebar';

type Props = {
  menuItems: ReactNode;
  secondMenuItems?: ReactNode;
  mobileMenuItems: ReactNode;
};

export default function DashboardLayout({
  children,
  menuItems,
  secondMenuItems,
  mobileMenuItems,
}: PropsWithChildren<Props>) {
  return (
    <Stack
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      alignItems="stretch"
      sx={{ minHeight: '100%' }}
    >
      <Sidebar menuItems={menuItems} secondMenuItems={secondMenuItems}>
        <Logo />
      </Sidebar>
      <DashboardPage
        sx={{
          marginLeft: {
            xs: 0,
            lg: '300px',
          },
        }}
      >
        {children}
      </DashboardPage>
      {mobileMenuItems}
    </Stack>
  );
}
