'use client';

import routes from '@/constants/routes';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import { Box, Button, Container, Typography } from '@mui/material';

import DataCardExplorerLoading from '../data-card/data-card-loading';
import DataModelExplorerCard from '../data-model-card/data-model-card';

type Props = {
  title?: string;
  viewMore?: boolean;
};

export default function DataModelsExplorerFeatured({ title, viewMore }: Props) {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: viewMore ? 4 : 0,
        }}
      >
        <Typography
          component="h3"
          variant="h5"
          sx={{
            mb: !viewMore ? 2 : 0,
          }}
        >
          {title ?? explorerDataModels.featureTitle}
        </Typography>
        {viewMore && (
          <Button variant="text" href={routes.explorer.dataModels}>
            {explorerDataModels.view_more}
          </Button>
        )}
      </Box>
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
            <DataCardExplorerLoading />
            <DataCardExplorerLoading />
            <DataCardExplorerLoading />
            <DataCardExplorerLoading />
          </>
        )}
        {dataModels.data?.dataModels.map((dataModel) => (
          <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
        ))}
      </Box>
    </Container>
  );
}
