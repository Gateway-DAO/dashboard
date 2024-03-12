import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import HelpContentCard from '@/components/help-content-card/help-content-card';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { datamodels, helperContent } from '@/locale/en/datamodel';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { isSandbox } from '@/utils/env';

import { Box } from '@mui/material';

export default function DataModelsLayout({ children }: PropsWithChildren) {
  if (!isSandbox) {
    redirect(routes.dashboard.user.home);
  }
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={datamodels.title}
        subtitle={datamodels.subtitle}
        titleId="title-data-models"
      />

      <HelpContentCard
        title={helperContent.title}
        desc={helperContent.desc}
        btnText={helperContent.btnText}
        btnLink={helperContent.btnLink}
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
            href={routes.dashboard.user.myDataModels}
          />
          <GTWTab
            label={datamodels.network_data_models}
            href={routes.dashboard.user.networkDataModels}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
