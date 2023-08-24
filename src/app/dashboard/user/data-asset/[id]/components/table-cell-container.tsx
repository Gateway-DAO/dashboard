'use client';
import { ReactNode } from 'react';

import { Box, Divider, Stack } from '@mui/material';

type Props = {
  children: ReactNode;
};

export function TableCellContainer({ children }: Props) {

  return (
    <Stack
      alignItems="stretch"
      justifyContent="space-around"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
      }}
      divider={
        <Box>
          <Divider sx={{
            display: {
              xs: "none",
              lg: "block"
            }
          }}
            orientation='horizontal' />
          <Divider sx={{
            display: {
              xs: "block",
              lg: "none"
            }
          }}
            orientation='vertical' />
        </Box>
      }
    >
      {children}
    </Stack>
  );
}
