'use client';

import { PropsWithChildren, ReactNode } from 'react';

import Logo from '@/components/logo/logo';
import routes from '@/constants/routes';
import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { isSandbox } from '@/utils/env';

import { Box, Chip, Tooltip } from '@mui/material';
import { Stack } from '@mui/system';

import AuthComponent from './auth-component/auth-component';
import MenuContainer from './sidebar/menu-container';
import Sidebar from './sidebar/sidebar';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <Stack
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      alignItems="stretch"
      sx={{ minHeight: '100%' }}
    >
      <Sidebar />
      <Box
        width="100%"
        sx={{
          px: CONTAINER_PX,
          pt: {
            xs: 2,
            lg: 5,
          },
          pb: {
            xs: 10,
            lg: 4,
          },
          ml: {
            xs: 0,
            lg: '300px',
          },
          width: { xs: '100%', lg: 'calc(100% - 300px)' },
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
