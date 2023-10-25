'use client';

import { explorerDataModels } from '@/locale/en/datamodel';

import { Box, Container, Typography } from '@mui/material';

import DataModelExplorerCard from '../../components/data-model-card/data-model-card';
import { useQuery } from '@tanstack/react-query';
import { apiPublic } from '@/services/protocol/api';
import DataModelExplorerCardLoading from '../../components/data-model-card/data-model-card-loading';

export default function DataModelsExplorerFeatured() {
  const dataModels = useQuery({
    queryKey: ['data-models-featured'],
    queryFn: () => apiPublic.explorer_data_models_featured(),
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
        {explorerDataModels.featureTitle}
      </Typography>
      <Box
        sx={{
          gap: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {dataModels.isLoading && (
          <>
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
            <DataModelExplorerCardLoading />
          </>
        )}
        {dataModels.data?.dataModels.map((dataModel) => (
          <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
        ))}
      </Box>
    </Container>
  );
}
