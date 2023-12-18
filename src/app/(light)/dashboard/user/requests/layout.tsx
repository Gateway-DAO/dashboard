import { PropsWithChildren } from 'react';

import { InstructionGuide } from '@/components/instruction-guide';
import TitleLayout from '@/components/title-layout/title-layout';
import { instructionGuide } from '@/locale/en/educational';
import { requests } from '@/locale/en/request';

import { Box } from '@mui/material';

export default function DataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requests.title}
        subtitle={requests.subtitle}
        titleId="title-data-request-templates"
      />

      <InstructionGuide
        id="user-requests"
        title={instructionGuide.createRequest.title}
        desc={instructionGuide.createRequest.description}
        btnLink={instructionGuide.createRequest.btn_link}
        btnText={instructionGuide.createRequest.btn_text}
        videoUrl={instructionGuide.createRequest.video_link}
      />

      {children}
    </Box>
  );
}
