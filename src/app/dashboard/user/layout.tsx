import { PropsWithChildren } from 'react';

import BackButton from '@/components/buttons/back-button';
import { ClientNav } from '@/components/navbar/client-nav';

import { Box, Stack } from '@mui/material';

import DashboardLayout from '../components/dashboard-layout';
import MenuItems from './components/menu-items';

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardLayout menuItems={<MenuItems />}>
        <Stack
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
          {/* TODO: sAdd back action */}
          <BackButton />
          <Box>
            <ClientNav />
          </Box>
        </Stack>
        {children}
      </DashboardLayout>
    </>
  );
}
