import { Metadata } from 'next';
import React from 'react';

import { authApi } from '@/services/api/api';
import { getServerComponentSession } from '@/services/next-auth/config';

import { Box, Paper, Stack, Typography } from '@mui/material';

import StorageList from './components/storage-list';

export const metadata: Metadata = {
  title: 'Storage - Gateway',
};

export default async function Storage() {
  const session = await getServerComponentSession();
  if (!session?.token) {
    return null;
  }
  const { data } = await authApi(session.token).GET('/data-assets/me');

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
            {data?.meta?.total_items ?? 0}
          </Typography>
        </Stack>
        <Box sx={{ flex: 1 }} />
        {/* <Stack
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
        </Stack> */}
      </Stack>
      <Box>
        <StorageList />
      </Box>
    </>
  );
}
