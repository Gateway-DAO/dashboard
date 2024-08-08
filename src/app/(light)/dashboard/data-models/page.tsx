import { Metadata } from 'next';

import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/material';

import { DataModelHeader } from './components/data-model-header';
import DataModelList from './components/data-model-list';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Model - Gateway Network',
  };
}

export default function DataModelPage() {
  return (
    <>
      <DataModelHeader />
      <Box
        sx={{
          pt: 5,
          ml : 5
        }}
      >
        <DataModelList />
      </Box>
    </>
  );
}
