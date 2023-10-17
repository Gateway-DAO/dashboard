import { PropsWithChildren } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import { datamodels } from '@/locale/en/datamodel';

import { Box } from '@mui/material';

export default function OrgDataModelsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        titleId={datamodels.id}
        title={datamodels.title}
        subtitle={datamodels.org_subtitle}
      />
      {children}
    </Box>
  );
}
