import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import MenuItems, { MenuBottombarItems } from './components/menu-items';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardLayout menuItems={<MenuItems />} mobileMenuItems={<MenuBottombarItems />}>
        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            display: 'flex',
            pt: 2,
            flexGrow: {
              md: 0.5,
            },
          }}
        >
        <BackButton />
      </Stack> */}
        {children}
      </DashboardLayout >
    </>
  );
}
