import { PropsWithChildren } from 'react';

import { InstructionGuide } from '@/components/instruction-guide/instruction-guide';
import TitleLayout from '@/components/title-layout/title-layout';
import { instructionGuideKeys } from '@/constants/instruction-guide';
import { instructionGuide } from '@/locale/en/educational';
import { requests } from '@/locale/en/request';

import { Box } from '@mui/material';

export default function OrgDataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        titleId={requests.id}
        title={requests.title}
        subtitle={requests.org_subtitle}
      />
      <Box marginTop={1.1}>
        <InstructionGuide
          storageKey={instructionGuideKeys.org_requests}
          title={instructionGuide.createRequest.title}
          desc={instructionGuide.createRequest.description}
          btnText={instructionGuide.createRequest.btn_text}
          videoUrl={instructionGuide.createRequest.video_link}
        />
      </Box>
      {children}
    </Box>
  );
}
