import { PropsWithChildren } from 'react';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { pdas, helperContent } from '@/locale/en/pda';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/system';

import HelpContentCard from '@/components/help-content-card/help-content-card';

import SandboxAlert from './components/sandbox-alert';

export default function DataAssetsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      {process.env.NEXT_PUBLIC_API_ENV === 'testnet' && <SandboxAlert />}
      <TitleLayout
        title={pdas.my_data_assets}
        subtitle={pdas.data_assets_subtitle}
        titleId="title-assets"
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
            label={common.general.received}
            href={routes.dashboardUserReceivedAssets}
          />
          <GTWTab
            label={common.general.issued}
            href={routes.dashboardUserIssuedAssets}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
     
    </Box>
  );
}
