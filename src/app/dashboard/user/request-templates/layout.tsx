import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { InstructionGuide } from '@/components/instruction-guide/instruction-guide';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import { instructionGuideKeys } from '@/constants/instruction-guide';
import routes from '@/constants/routes';
import { instructionGuide } from '@/locale/en/educational';
import { requestTemplates } from '@/locale/en/request-template';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { isSandbox } from '@/utils/env';

import { Box } from '@mui/material';

export default function DataRequestTeampltesLayout({
  children,
}: PropsWithChildren) {
  if (!isSandbox) {
    redirect(routes.dashboard.user.home);
  }
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requestTemplates.title}
        subtitle={requestTemplates.subtitle}
        titleId="title-data-request-templates"
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
            href={routes.dashboard.user.myRequestTemplates}
          />
          <GTWTab
            label={requestTemplates.network_data_request_templates}
            href={routes.dashboard.user.networkRequestTemplates}
          />
        </GTWTabs>
      </Box>
      <Box marginY={2}>
        <InstructionGuide
          storageKey={instructionGuideKeys.user_request_templates}
          title={instructionGuide.createRequest.title}
          desc={instructionGuide.createRequest.description}
          btnText={instructionGuide.createRequest.btn_text}
          videoUrl={instructionGuide.createRequest.video_link}
        />
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
