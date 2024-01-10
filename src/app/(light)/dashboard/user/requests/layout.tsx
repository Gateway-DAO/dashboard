import { PropsWithChildren } from 'react';

import HelpContentCard from '@/components/help-content-card/help-content-card';
import TitleLayout from '@/components/title-layout/title-layout';
import { requests, helperContent } from '@/locale/en/request';

import { Box, Typography } from '@mui/material';

export default function DataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requests.title}
        subtitle={requests.subtitle}
        titleId="title-data-request-templates"
      />
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
