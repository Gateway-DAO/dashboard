import React from 'react';

import { Box, Container, Divider, Stack, Typography } from '@mui/material';

const items = [
  'Lending History',
  'Consumer Preferences',
  'Personhood',
  'Browsing History',
  'Gamer Score',
  'Social Reputation',
  'Work Experience',
  'Attestations',
  'Education',
];

export default function UnlockGateway() {
  return (
    <Stack
      component={Container}
      flexDirection={{
        xs: 'column',
        lg: 'row',
      }}
      sx={{
        pt: {
          xs: 6,
          md: 17.5,
        },
        pb: {
          xs: 6,
          md: 15,
        },
        color: 'white!important',
      }}
      gap={3}
    >
      <Box
        sx={{
          width: {
            lg: 316,
          },
          flexShrink: {
            lg: 0,
          },
        }}
      >
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{
            color: 'primary.200',
          }}
          fontWeight="lighter"
        >
          Unlock the gateway to
        </Typography>
      </Box>
      <Box>
        {items.map((item, index) => (
          <Typography
            key={item}
            variant="h3"
            color="inherit"
            fontWeight="lighter"
            sx={{
              opacity: (items.length - 1 - index) / (items.length - 1),
              transition: 'opacity 0.1s',
              typography: {
                xs: 'h5',
                sm: 'h4',
                md: 'h3',
              },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}
