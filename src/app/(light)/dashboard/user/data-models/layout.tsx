import { PropsWithChildren } from 'react';

import { datamodels } from '@/locale/en/datamodel';

import { Box, Typography } from '@mui/material';

export default function DataModelsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          mb: {
            xs: 4,
            md: 5,
            lg: 6,
          },
        }}
      >
        <Typography variant="h3" id="title-data-models" sx={{ mb: 1 }}>
          {datamodels.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {datamodels.subtitle}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
