import { PropsWithChildren } from 'react';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { requestTemplates } from '@/locale/en/request-template';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/material';

export default function DataRequestTeampltesLayout({
  children,
}: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requestTemplates.title}
        subtitle={requestTemplates.subtitle}
        titleId="title-request-templates"
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
            label={requestTemplates.my_data_request_templates}
            href={routes.dashboardUserMyDataModels}
          />
          <GTWTab
            label={requestTemplates.network_data_request_templates}
            href={routes.dashboardUserNetworkDataModels}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
