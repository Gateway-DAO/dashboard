import { PropsWithChildren } from 'react';

import { InstructionGuide } from '@/components/instruction-guide';
import TitleLayout from '@/components/title-layout/title-layout';
import { requests, instructionGuide } from '@/locale/en/request';

import { Box } from '@mui/material';

export default function DataRequestsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requests.title}
        subtitle={requests.subtitle}
        titleId="title-data-request-templates"
      />
      <div>
        <InstructionGuide
          title={instructionGuide.title}
          desc={instructionGuide.description}
          btnLink={instructionGuide.btn_link}
          btnText={instructionGuide.btn_text}
          videoUrl={instructionGuide.video_link}
        />
      </div>
      {children}
    </Box>
  );
}
