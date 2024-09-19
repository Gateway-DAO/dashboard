'use client';

import { PropsWithChildren } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box } from '@mui/material';
import { Stack } from '@mui/system';

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
