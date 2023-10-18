import { PropsWithChildren } from 'react';

import HelpContentCard from '@/components/help-content-card/help-content-card';
import { requests, helperContent } from '@/locale/en/request';

import { Box, Typography } from '@mui/material';

export default function DataRequestsLayout({ children }: PropsWithChildren) {
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
        <Typography variant="h3" id="title-requests" sx={{ mb: 1 }}>
          {requests.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {requests.subtitle}
        </Typography>
      </Box>
      <HelpContentCard
        title={helperContent.title}
        desc={helperContent.desc}
        btnText={helperContent.btnText}
        btnLink={helperContent.btnLink}
      />
      {children}
    </Box>
  );
}
