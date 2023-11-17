import { PropsWithChildren } from 'react';

import HelpContentCard from '@/components/help-content-card/help-content-card';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';

import { Box } from '@mui/system';

export default function DataAssetsLayout({ children }: PropsWithChildren) {
  return <Box sx={{ py: 2 }}>{children}</Box>;
}
