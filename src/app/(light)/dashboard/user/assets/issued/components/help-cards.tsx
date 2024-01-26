'use client';

import HelpCtaCard from '@/components/help-cta-card/help-cta-card';
import QuestionSquaredIcon from '@/components/icons/question-squared';
import VideoSquaredIcon from '@/components/icons/video-squared';
import Instruction from '@/components/instruction/instruction';
import { educationalKeys, helpStorageKeys } from '@/constants/educational';
import useEducational from '@/hooks/use-educational';
import useLocalStorageHelpCard from '@/hooks/use-help-card';
import { pdas } from '@/locale/en/pda';
import { useToggle } from '@react-hookz/web';

import { Stack } from '@mui/material';

export default function HelpCards() {
  const [videoPlayer, setVideoPlayer] = useToggle(false);

  const { onRemoveStorage } = useLocalStorageHelpCard({
    storageKey: helpStorageKeys.help_cta_video_how_to_issue_a_pda,
  });

  const { setEducational } = useEducational();

  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <HelpCtaCard
        icon={QuestionSquaredIcon}
        title={pdas.help_how_to_issue_a_pda.title}
        desc={pdas.help_how_to_issue_a_pda.description}
        image={VideoSquaredIcon}
        btnText={pdas.help_how_to_issue_a_pda.text_button}
        onClick={() => setVideoPlayer(true)}
        storageKey={helpStorageKeys.help_cta_video_how_to_issue_a_pda}
        color="blue"
      />
      <Instruction
        title={pdas.help_how_to_issue_a_pda.title}
        description={pdas.help_how_to_issue_a_pda.description}
        link={pdas.help_how_to_issue_a_pda.link}
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
