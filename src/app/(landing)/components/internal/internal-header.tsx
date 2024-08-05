import { PropsWithChildren, ReactNode } from 'react';

import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';

export default function InternalHeader({
  children,
  slot,
}: PropsWithChildren<{ slot?: ReactNode }>) {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'primary.100',
        pt: 8,
      }}
    >
      <Stack
        component={Container}
        sx={{
          pt: {
            xs: 6,
            md: 14.5,
          },
          pb: {
            xs: 3,
            md: 7,
          },
        }}
      >
        <Typography
          component="h1"
          fontWeight="bold"
          sx={{
            typography: {
              xs: 'h4',
              md: 'h1',
            },
            fontWeight: 'lighter!important',
            maxWidth: 990,
          }}
        >
          {children}
        </Typography>
        {slot}
      </Stack>
    </Box>
  );
}
