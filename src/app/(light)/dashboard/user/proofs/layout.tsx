import { PropsWithChildren } from 'react';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { proofs } from '@/locale/en/proof';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function DataProofsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          mb: {
            xs: 4,
            md: 5,
            lg: 6,
          },
        }}
      >
        <Typography variant="h3" id="title-proofs" sx={{ mb: 1 }}>
          {proofs.data_proofs}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {proofs.data_proofs_subtitle}
        </Typography>
      </Box>
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
            href={routes.dashboardUserReceivedProofs}
          />
          <GTWTab
            label={common.general.sent}
            href={routes.dashboardUserSentProofs}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
