import { Box, Container, Typography } from '@mui/material';

import DataModelExplorerCard from '../../components/data-model-card';
import DataModelsExplorerSearchFilters from './filters';

export default function DataModelsExplorerSearch() {
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
        {Array.from({ length: 8 }).map((_, index) => (
          <DataModelExplorerCard key={index} />
        ))}
      </Box>
    </Container>
  );
}
