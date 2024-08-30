import { Metadata } from 'next';
import React from 'react';

import { formatBytes } from '@/utils/bytes';

import { Box, Paper, Stack, Typography } from '@mui/material';

import StorageList from './components/storage-list';

export const metadata: Metadata = {
  title: 'Storage - Gateway',
};

export default function Storage() {
  return (
    <>
      <Typography variant="h3" mb={1}>
        Storage
      </Typography>
      <Typography color="textSecondary">
        These are all the data assets you have uploaded to your storage
      </Typography>
      <Stack gap={2} mt={2} direction="row">
        <Stack
          component={Paper}
          elevation={0}
          justifyContent="space-between"
          gap={1}
          sx={{ p: 2, backgroundColor: 'primary.100', flex: 1 }}
        >
          <Typography variant="caption" color="primary.dark">
            Data assets
          </Typography>
          <Typography variant="h5" color="primary.dark">
            0
          </Typography>
        </Stack>
        <Stack
          component={Paper}
          elevation={0}
          justifyContent="space-between"
          gap={1}
          sx={{ p: 2, backgroundColor: 'primary.100', flex: 1 }}
        >
          <Typography variant="caption" color="primary.dark">
            Data storage
          </Typography>
          <Typography variant="h5" color="primary.dark">
            {formatBytes(2000)}
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <StorageList />
      </Box>
    </>
  );
}
