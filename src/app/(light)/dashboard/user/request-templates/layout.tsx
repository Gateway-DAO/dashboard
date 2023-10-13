import { PropsWithChildren } from 'react';

import { requestTemplates } from '@/locale/en/request-template';

import { Box, Typography } from '@mui/material';

export default function DataRequestTeampltesLayout({
  children,
}: PropsWithChildren) {
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
        <Typography variant="h3" id="title-request-templates" sx={{ mb: 1 }}>
          {requestTemplates.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {requestTemplates.subtitle}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
