import { PropsWithChildren } from 'react';

import DashboardLayout from '../components/dashboard-layout';
import MenuBottomListItems from './components/menu-bottom-list-items';
import MenuListItems from './components/menu-list-items';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardLayout menuItems={<MenuListItems />} mobileMenuItems={<MenuBottomListItems />}>
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
