'use client';

import { useEffect } from 'react';

import EducationalModal from '@/components/educational/components/educational-modal';
import HelpCtaCard from '@/components/help-cta-card/help-cta-card';
import AssetTemplateImage from '@/components/icons/asset-template';
import QuestionSquaredIcon from '@/components/icons/question-squared';
import VerifyPdaIcon from '@/components/icons/verify-pda';
import VideoSquaredIcon from '@/components/icons/video-squared';
import Instruction from '@/components/instruction/instruction';
import { educationalKeys, helpStorageKeys } from '@/constants/educational';
import { mutations } from '@/constants/queries';
import useEducational from '@/hooks/use-educational';
import useLocalStorageHelpCard from '@/hooks/use-help-card';
import { pdas } from '@/locale/en/pda';
import { useToggle } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';

import { Stack } from '@mui/material';

export default function PdasHelpCards() {
  const [videoPlayer, setVideoPlayer] = useToggle(false);
  const [claimFirstPdaModal, setClaimFirstPdaModal] = useToggle(false);

  useEffect(() => {
    const storageSession = localStorage.getItem('widget-educational-session');
    if (storageSession) {
      getSession(storageSession);
    }
  }, []);

  const { onRemoveStorage } = useLocalStorageHelpCard({
    storageKey: helpStorageKeys.help_cta_video_how_to_use_pda,
  });

  const { setEducational } = useEducational();

  const { mutateAsync: onGetSession } = useMutation({
    mutationKey: [
      mutations.get_issued_session_educational,
      'widgetEducational',
    ],
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
    setEducational({
      key: educationalKeys.start_using_pda,
      value: session.pdaId,
    });
  };

  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <HelpCtaCard
        icon={VerifyPdaIcon}
        title={pdas.help_claim_first_pda_card.title}
        image={AssetTemplateImage}
        btnText={pdas.help_claim_first_pda_card.text_button}
        onClick={() => setClaimFirstPdaModal(true)}
        storageKey={helpStorageKeys.help_cta_claim_your_first_pda}
      />
      <HelpCtaCard
        icon={QuestionSquaredIcon}
        title={pdas.help_video_card.title}
        desc={pdas.help_video_card.description}
        image={VideoSquaredIcon}
        btnText={pdas.help_video_card.text_button}
        onClick={() => setVideoPlayer(true)}
        storageKey={helpStorageKeys.help_cta_video_how_to_use_pda}
        color="blue"
      />
      <EducationalModal
        open={claimFirstPdaModal}
        onClose={() => setClaimFirstPdaModal(false)}
      />
      <Instruction
        title={pdas.help_video_card.title}
        description={pdas.help_video_card.description}
        link={pdas.help_video_card.link}
        onClose={() => {
          onRemoveStorage();
          setVideoPlayer(false);
          setEducational({
            key: educationalKeys.start_issuing_now,
            value: true,
          });
        }}
        open={videoPlayer}
      />
    </Stack>
  );
}
