import { Metadata } from 'next';
import React from 'react';

import { Typography } from '@mui/material';

import StorageList from './components/storage-list';

export const metadata: Metadata = {
  title: 'Storage',
};

export default async function Storage() {
  return (
    <>
      <Typography variant="h3" mb={1}>
        Storage
      </Typography>
      <Typography color="textSecondary">
        These are all the data assets you have uploaded to your storage
      </Typography>
      <StorageList />
    </>
  );
}
