import React from 'react';

import { Box, Container, Divider, Stack, Typography } from '@mui/material';

const useCases = [
  {
    title: 'User-Control',
    text: 'The first privacy preserving decentralized storage network. Encrypting, sharing, and storing personal information in user controlled encrypted data vaults. ',
  },
  {
    title: 'Privacy Enhancing Technologies',
    text: 'State of the art encryption methods such as Fully-Homomorphic Encryption (FHE), Proxy Re-encryption, and programmatic access control permits secure data sharing. ',
  },
  {
    title: 'Turning Data into Building Blocks',
    text: 'FHE-based computation  enables computer over fully encrypted data. This eliminates privacy issues and data leaks, while allowing new data apps and interactions.',
  },
];
export default function OurMission() {
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
          Our Mission
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h3"
          color="inherit"
          sx={{
            typography: {
              xs: 'h5',
              sm: 'h4 ',
              md: 'h3',
            },
          }}
        >
          Build the foundation to the first data economy, where private data
          becomes a powerful asset.
        </Typography>
        <Stack
          gap={3}
          divider={<Divider variant="light" />}
          sx={{
            maxWidth: {
              md: 664,
            },
            mt: {
              xs: 6,
              sm: 9,
              md: 18.5,
            },
          }}
        >
          {useCases.map((useCase) => (
            <Stack key={useCase.title} gap={2} sx={{ py: 5 }}>
              <Typography variant="h5" color="primary.200">
                {useCase.title}
              </Typography>
              <Typography>{useCase.text}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
