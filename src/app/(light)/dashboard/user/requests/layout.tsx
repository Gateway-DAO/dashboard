import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { requests } from '@/locale/en/request';

import { Box } from '@mui/system';

export default function DataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requests.title}
        subtitle={requests.subtitle}
        titleId="title-requests"
      />
      {children}
    </Box>
  );
}
