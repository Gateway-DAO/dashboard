import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { InstructionGuide } from '@/components/instruction-guide/instruction-guide';
import TitleLayout from '@/components/title-layout/title-layout';
import { instructionGuideKeys } from '@/constants/instruction-guide';
import routes from '@/constants/routes';
import { instructionGuide } from '@/locale/en/educational';
import { requests } from '@/locale/en/request';
import { isSandbox } from '@/utils/env';

import { Box } from '@mui/material';

export default function DataRequestsLayout({ children }: PropsWithChildren) {
  if (!isSandbox) {
    redirect(routes.dashboard.user.home);
  }
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={requests.title}
        subtitle={requests.subtitle}
        titleId="title-data-request-templates"
      />

      <InstructionGuide
        storageKey={instructionGuideKeys.user_requests}
        title={instructionGuide.createRequest.title}
        desc={instructionGuide.createRequest.description}
        btnText={instructionGuide.createRequest.btn_text}
        videoUrl={instructionGuide.createRequest.video_link}
      />

      {children}
    </Box>
  );
}
