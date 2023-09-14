import TitleLayout from '@/components/title-layout/title-layout';
import { pdas } from '@/locale/en/pda';

import { Box } from '@mui/material';

import PDAsTable from './components/pdas-table';

export default function OrganizationIssuedAssetsPage() {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={pdas.my_data_assets}
        subtitle={pdas.data_assets_subtitle}
        titleId="title-org-assets"
      />
      <PDAsTable />
    </Box>
  );
}
