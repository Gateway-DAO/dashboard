'use client';
import { ReactNode } from 'react';

import { theme } from '@/theme';

import { Box, Divider, Stack, useMediaQuery } from '@mui/material';

type Props = {
  children: ReactNode;
};

export function TableCellContainer({ children }: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Stack
      alignItems="stretch"
      justifyContent="space-around"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
      }}
      divider={
        <Box>
          <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
        </Box>
      }
    >
      {children}
    </Stack>
  );
}
