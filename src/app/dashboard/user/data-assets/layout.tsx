import { PropsWithChildren } from 'react';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function DataAssetsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <Typography
        variant="h3"
        sx={{
          mb: {
            xs: 4,
            md: 5,
            lg: 6,
          },
        }}
      >
        My data assets
      </Typography>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      >
        <GTWTabs>
          <GTWTab label="Private" href="/dashboard/user/data-assets" />
          <GTWTab
            label="Shared With"
            href="/dashboard/user/data-assets/shared-with"
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
