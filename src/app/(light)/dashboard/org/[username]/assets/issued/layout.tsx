import { PropsWithChildren } from 'react';

import SandboxAlert from '@/app/(light)/dashboard/components/alerts/sandbox-alert';
import TitleLayout from '@/components/title-layout/title-layout';
import { orgPdas } from '@/locale/en/pda';

import { Box } from '@mui/material';

export default function OrgDataAssetsIssued({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      {process.env.NEXT_PUBLIC_API_ENV === 'testnet' && <SandboxAlert />}
      <TitleLayout
        title={orgPdas.data_assets_title}
        subtitle={orgPdas.data_assets_subtitle}
        titleId="title-org-assets"
      />
      {children}
    </Box>
  );
}
