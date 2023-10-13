import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { requestTemplates } from '@/locale/en/request-template';

import { Box } from '@mui/material';

export default function OrgDataRequestTemplatesLayout({
  children,
}: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        titleId={requestTemplates.title}
        title={requestTemplates.title}
        subtitle={requestTemplates.org_subtitle}
      />
      {children}
    </Box>
  );
}
