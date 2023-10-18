import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { requests } from '@/locale/en/request';

import { Box } from '@mui/material';

export default function OrgDataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        titleId={requests.id}
        title={requests.title}
        subtitle={requests.org_subtitle}
      />
      {children}
    </Box>
  );
}
