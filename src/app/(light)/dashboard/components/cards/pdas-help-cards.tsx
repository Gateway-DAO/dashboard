'use client';

import EducationalModal from '@/components/educational/components/educational-modal';
import HelpClaimFirstPdaCard from '@/components/help-claim-first-pda-card/help-claim-first-pda-card';
import HelpCtaVideoCard from '@/components/help-cta-video-card/help-cta-video-card';
import DataSquaredIcon from '@/components/icons/data-squared';
import Instruction from '@/components/instruction/instruction';
import { pdas } from '@/locale/en/pda';
import { useToggle } from '@react-hookz/web';

import { Stack } from '@mui/material';

export default function PdasHelpCards() {
  const [videoPlayer, setVideoPlayer] = useToggle(false);
  const [claimFirstPdaModal, setClaimFirstPdaModal] = useToggle(false);
  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <HelpClaimFirstPdaCard
        title={pdas.help_claim_first_pda_card.title}
        btnText={pdas.help_claim_first_pda_card.text_button}
        onClickCard={() => setClaimFirstPdaModal(true)}
        icon={DataSquaredIcon}
      />
      <HelpCtaVideoCard
        title={pdas.help_video_card.title}
        desc={pdas.help_video_card.description}
        btnText={pdas.help_video_card.text_button}
        onClickVideo={() => setVideoPlayer(true)}
      />
      <EducationalModal
        open={claimFirstPdaModal}
        onClose={() => setClaimFirstPdaModal(false)}
      />
      <Instruction
        title={pdas.help_video_card.title}
        description={pdas.help_video_card.description}
        link={pdas.help_video_card.link}
        onClose={() => setVideoPlayer(false)}
        open={videoPlayer}
      />
    </Stack>
  );
}
