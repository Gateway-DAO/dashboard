import { explorerDataModels } from '@/locale/en/datamodel';

import { Box, Container, Typography } from '@mui/material';

import DataModelExplorerCard from '../../components/data-model-card';
import { PartialDeep } from 'type-fest';
import { DataModel } from '@/services/protocol/types';

type Props = {
  dataModels: PartialDeep<DataModel>[];
};

export default function DataModelsExplorerFeatured({ dataModels }: Props) {
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
        {dataModels.map((dataModel) => (
          <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
        ))}
      </Box>
    </Container>
  );
}
