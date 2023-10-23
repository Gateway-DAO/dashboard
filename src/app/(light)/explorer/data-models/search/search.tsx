'use client';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import { Box, Container, Typography } from '@mui/material';

import DataModelExplorerCard from '../../components/data-model-card';
import DataModelsExplorerSearchFilters from './filters';

export default function DataModelsExplorerSearch() {
  const dataModels = useQuery({
    queryKey: ['data-models'],
    queryFn: () => apiPublic.explorer_data_models_list({ filter: {}, skip: 0 }),
  });

  return (
    <Container
      sx={{
        py: 3,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        All data models
      </Typography>
      <DataModelsExplorerSearchFilters />
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={2}
      >
        {dataModels.data?.dataModels.map((dataModel) => (
          <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
        ))}
      </Box>
    </Container>
  );
}
