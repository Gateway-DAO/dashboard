import { ReactNode } from 'react';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { pdas } from '@/locale/en/pda';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/material';

type Props = {
  children?: ReactNode;
};

export default function PdasHeader({ children }: Props) {
  return (
    <>


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
            href={routes.dashboard.user.receivedAssets}
          />
          <GTWTab
            label={common.general.issued}
            href={routes.dashboard.user.issuedAssets}
          />
        </GTWTabs>
      </Box>
    </>
  );
}
