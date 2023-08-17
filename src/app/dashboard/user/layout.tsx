'use client';
import { PropsWithChildren } from 'react';

import { ClientNav } from '@/components/navbar/client-nav';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, IconButton, Stack } from '@mui/material';

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
          {/* Add back action */}
          <IconButton onClick={() => console.log('Back')}>
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Box>
            <ClientNav />
          </Box>
        </Stack>
        {children}
      </DashboardLayout>
    </>
  );
}
