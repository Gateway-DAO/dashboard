'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

import { sandboxAlert } from '@/locale/en/alert-messages';
import {
  CONTAINER_PB,
  CONTAINER_PT,
  CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { isSandbox } from '@/utils/env';

import { Box, Chip, Tooltip } from '@mui/material';
import { Stack } from '@mui/system';

import SandboxAlert from '../components/alerts/sandbox-alert';
import Logo from '../components/logo/logo';
import Sidebar from '../components/sidebar/sidebar';

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
  const pathname = usePathname();
  const isNotWalletPage = !pathname.includes('wallet');

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
          {isSandbox && (
            <Tooltip title={sandboxAlert.tooltip} placement="right" arrow>
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
      <Box
        width="100%"
        sx={{
          px: CONTAINER_PX,
          pt: CONTAINER_PT,
          pb: CONTAINER_PB,
          ml: {
            xs: 0,
            lg: '300px',
          },
          width: { xs: '100%', lg: 'calc(100% - 300px)' },
          overflow: 'hidden',
        }}
      >
        {isSandbox && isNotWalletPage && <SandboxAlert />}
        {children}
      </Box>
      {mobileMenuItems}
    </Stack>
  );
}
