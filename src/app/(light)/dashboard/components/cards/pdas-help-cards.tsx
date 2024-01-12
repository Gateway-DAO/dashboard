'use client';

import EducationalModal from '@/components/educational/components/educational-modal';
import HelpCtaCard from '@/components/help-cta-card/help-cta-card';
import AssetTemplateImage from '@/components/icons/asset-template';
import QuestionSquaredIcon from '@/components/icons/question-squared';
import VerifyPdaIcon from '@/components/icons/verify-pda';
import VideoSquaredIcon from '@/components/icons/video-squared';
import Instruction from '@/components/instruction/instruction';
import { pdas } from '@/locale/en/pda';
import { useToggle } from '@react-hookz/web';

import { Stack } from '@mui/material';

export default function PdasHelpCards() {
  const [videoPlayer, setVideoPlayer] = useToggle(false);
  const [claimFirstPdaModal, setClaimFirstPdaModal] = useToggle(false);
  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <HelpCtaCard
        icon={VerifyPdaIcon}
        title={pdas.help_claim_first_pda_card.title}
        image={AssetTemplateImage}
        btnText={pdas.help_claim_first_pda_card.text_button}
        onClick={() => setClaimFirstPdaModal(true)}
        key="help-cta-claim-your-first-pda"
      />
      <HelpCtaCard
        icon={QuestionSquaredIcon}
        title={pdas.help_video_card.title}
        desc={pdas.help_video_card.description}
        image={VideoSquaredIcon}
        btnText={pdas.help_video_card.text_button}
        onClick={() => setVideoPlayer(true)}
        key="help-cta-video-how-to-use-pda"
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
        onClose={() => setVideoPlayer(false)}
        open={videoPlayer}
      />
    </Stack>
  );
}
