'use client';

import { PropsWithChildren, ReactNode } from 'react';

import { currentEnv } from '@/utils/env';

import { Box, Chip, Tooltip } from '@mui/material';
import { Stack } from '@mui/system';

import SandboxAlert from './alerts/sandbox-alert';
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
  const testnet = currentEnv() === 'testnet';

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />
          {testnet && (
            <Tooltip
              title="You are on the Gateway Sandbox. The data is temporary and will expire in 60 days."
              placement="right"
              arrow
            >
              <Chip
                color="warning"
                size="small"
                variant="filled"
                label="Sandbox"
              />
            </Tooltip>
          )}
        </Box>
      </Sidebar>
      <DashboardPage
        sx={{
          marginLeft: {
            xs: 0,
            lg: '300px',
          },
        }}
      >
        {testnet && <SandboxAlert />}
        {children}
      </DashboardPage>
      {mobileMenuItems}
    </Stack>
  );
}
