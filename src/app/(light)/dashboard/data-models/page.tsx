import { Metadata } from 'next';

import { Box } from '@mui/material';

import { DataModelHeader } from './components/data-model-header';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Model - Gateway Network',
  };
}

export default function DataModelPage() {
  return (
    <>
      <DataModelHeader />
      <Box sx={{ pt: 5 }}>
        <h1>data models</h1>
      </Box>
    </>
  );
}
