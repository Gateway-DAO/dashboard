import React from 'react';

import { Box, Container, Stack } from '@mui/material';

export default function About() {
  return (
    <Box component="section">
      <Stack
        component={Container}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        gap={4}
      >
        <Box
          sx={{
            backgroundColor: 'primary.100',
          }}
        >
          About
        </Box>
        <span>Our Team</span>
      </Stack>
    </Box>
  );
}
