import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { pdas } from '@/locale/en/pda';

import { Box } from '@mui/material';

export default function OrgDataAssetsIssued({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={pdas.my_data_assets}
        subtitle={pdas.data_assets_subtitle}
        titleId="title-org-assets"
      />
      {children}
    </Box>
  );
}
