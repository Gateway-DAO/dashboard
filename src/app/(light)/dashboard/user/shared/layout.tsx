import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import HelpContentCard from '@/components/help-content-card/help-content-card';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { proofs, helperContent } from '@/locale/en/proof';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { isSandbox } from '@/utils/env';

import { Box } from '@mui/system';

export default function DataProofsLayout({ children }: PropsWithChildren) {
  if (!isSandbox) {
    redirect(routes.dashboard.user.home);
  }
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={proofs.data_proofs}
        subtitle={proofs.data_proofs_subtitle}
        titleId="title-proofs"
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
            href={routes.dashboard.user.receivedProofs}
          />
          <GTWTab
            label={common.general.sent}
            href={routes.dashboard.user.sentProofs}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
