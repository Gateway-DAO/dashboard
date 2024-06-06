'use client';

import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

import PDAsList from './components/pdas-list/pdas-list';

export default function DashboardV3() {
  return (
    <>
      <TitleLayout title={pdasLocales.my_data_assets} titleId="title-assets">
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          href={routes.dashboard.user.issue}
        >
          {pdasLocales.upload_file}
        </Button>
      </TitleLayout>

      <Box sx={{ pt: 5 }}>
        <PDAsList />
      </Box>
    </>
  );
}
