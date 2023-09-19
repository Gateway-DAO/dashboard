import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { requests } from '@/locale/en/request';

import { Box } from '@mui/material';

export default function OrgDataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        titleId={requests.title}
        title={requests.title}
        subtitle={requests.subtitle}
      />
      {children}
    </Box>
  );
}
