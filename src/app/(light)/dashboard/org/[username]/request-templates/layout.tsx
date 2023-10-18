import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { requestTemplates } from '@/locale/en/request-template';

import { Box } from '@mui/material';

import SandboxAlert from '../../../components/alerts/sandbox-alert';

export default function OrgDataRequestTemplatesLayout({
  children,
}: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      {process.env.NEXT_PUBLIC_API_ENV === 'testnet' && <SandboxAlert />}
      <TitleLayout
        titleId={requestTemplates.id}
        title={requestTemplates.title}
        subtitle={requestTemplates.org_subtitle}
      />
      {children}
    </Box>
  );
}
