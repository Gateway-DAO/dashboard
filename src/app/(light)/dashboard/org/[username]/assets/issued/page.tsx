import { pdas } from '@/locale/en/pda';

import { Box, Stack, Typography } from '@mui/material';

import PDAsTable from './components/pdas-table';

export default function OrganizationIssuedAssetsPage() {
  return (
    <Stack>
      <Box
        sx={{
          mb: {
            xs: 4,
            md: 5,
            lg: 6,
          },
        }}
      >
        <Typography variant="h3">{pdas.my_data_assets}</Typography>
        <Typography variant="body1">{pdas.data_assets_subtitle}</Typography>
      </Box>
      <PDAsTable />
    </Stack>
  );
}
