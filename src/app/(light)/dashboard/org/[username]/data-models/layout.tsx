import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { datamodels } from '@/locale/en/datamodel';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/material';

export default async function OrgDataModelsLayout({ children, params }: any) {
  const pathnameOrg = await params?.username;
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={datamodels.title}
        subtitle={datamodels.subtitle}
        titleId="title-data-models"
      />

      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      >
        <GTWTabs>
          <GTWTab
            label={datamodels.my_data_models}
            href={routes.dashboard.org.myDataModels(pathnameOrg)}
          />
          <GTWTab
            label={datamodels.network_data_models}
            href={routes.dashboard.org.networkDataModels(pathnameOrg)}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
