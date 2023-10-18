import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { requests } from '@/locale/en/request';

import { Box } from '@mui/material';

import SandboxAlert from '../../../components/alerts/sandbox-alert';

export default function OrgDataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      {process.env.NEXT_PUBLIC_API_ENV === 'testnet' && <SandboxAlert />}
      <TitleLayout
        titleId={requests.id}
        title={requests.title}
        subtitle={requests.org_subtitle}
      />
      {children}
    </Box>
  );
}
