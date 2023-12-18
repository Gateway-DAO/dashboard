import { InstructionGuide } from '@/components/instruction-guide';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { instructionGuide } from '@/locale/en/educational';
import { requestTemplates } from '@/locale/en/request-template';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/material';

export default async function OrgDataRequestTemplatesLayout({
  children,
  params,
}: any) {
  const pathnameOrg = await params?.username;
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
            href={routes.dashboard.org.myRequestTemplates(pathnameOrg)}
          />
          <GTWTab
            label={requestTemplates.network_data_request_templates}
            href={routes.dashboard.org.networkRequestTemplates(pathnameOrg)}
          />
        </GTWTabs>
      </Box>
      <Box marginY={2}>
        <InstructionGuide
          id="org-request-templates"
          title={instructionGuide.createRequest.title}
          desc={instructionGuide.createRequest.description}
          btnLink={instructionGuide.createRequest.btn_link}
          btnText={instructionGuide.createRequest.btn_text}
          videoUrl={instructionGuide.createRequest.video_link}
        />
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
    </Box>
  );
}
