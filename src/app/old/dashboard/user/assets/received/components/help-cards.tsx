'use client';

import { useEffect } from 'react';

import AssetTemplateImage from '@/components/icons/asset-template';
import VerifyPdaIcon from '@/components/icons/verify-pda';
import { InstructionGuide } from '@/components/instruction-guide/instruction-guide';
import { coachMarkKeys } from '@/constants/coach-mark';
import { instructionGuideKeys } from '@/constants/instruction-guide';
import { mutations } from '@/constants/queries';
import useCoachMark from '@/hooks/use-coach-mark';
import { instructionGuide } from '@/locale/en/educational';
import { useMutation } from '@tanstack/react-query';

import { Stack } from '@mui/material';

import ClaimYourFirstPda from './claim-your-first-pda';

export default function HelpCards() {
  useEffect(() => {
    const storageSession = localStorage.getItem('widget-educational-session');
    if (storageSession) {
      getSession(storageSession);
    }
  }, []);

  const { setCoachMark } = useCoachMark();

  const { mutateAsync: onGetSession } = useMutation({
    mutationKey: [mutations.get_issued_session_educational, 'widgetCoachMark'],
    mutationFn: async (sessionId: string) => {
      const response = await fetch('/api/get-issued-session-educational', {
        method: 'POST',
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      if (data.error || !data.session) {
        console.error('Error on get session', data.error);
        throw new Error('Failed to get session');
      }
      return data;
    },
  });

  const getSession = async (sessionId: string) => {
    const { session } = await onGetSession(sessionId);
    setCoachMark({
      key: coachMarkKeys.start_using_pda,
      value: session.pdaId,
    });
  };

  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <InstructionGuide
        storageKey={instructionGuideKeys.claim_your_first_pda}
        title={instructionGuide.claim_your_first_pda.title}
        icon={VerifyPdaIcon}
        image={AssetTemplateImage}
        btnText={instructionGuide.claim_your_first_pda.btn_text}
        color="purple"
        removeStorageOnClose={false}
      >
        <ClaimYourFirstPda />
      </InstructionGuide>

      <InstructionGuide
        storageKey={instructionGuideKeys.how_to_use_pda}
        title={instructionGuide.useYourPda.title}
        desc={instructionGuide.useYourPda.description}
        btnText={instructionGuide.useYourPda.btn_text}
        videoUrl={instructionGuide.useYourPda.video_link}
      />
    </Stack>
  );
}
