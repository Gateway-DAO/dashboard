import { PropsWithChildren } from 'react';

import HelpContentCard from '@/components/help-content-card/help-content-card';
import TitleLayout from '@/components/title-layout/title-layout';
import { helperContent, requestTemplates } from '@/locale/en/request-template';

import { Box, Typography } from '@mui/material';

export default function DataRequestTeampltesLayout({
  children,
}: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requestTemplates.title}
        subtitle={requestTemplates.subtitle}
        titleId="request-template"
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
