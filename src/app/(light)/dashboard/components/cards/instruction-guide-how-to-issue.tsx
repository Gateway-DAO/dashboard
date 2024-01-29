'use client';

import { InstructionGuide } from '@/components/instruction-guide/instruction-guide';
import { coachMarkKeys } from '@/constants/coach-mark';
import { instructionGuideKeys } from '@/constants/instruction-guide';
import useCoachMarkal from '@/hooks/use-coach-mark';
import { instructionGuide } from '@/locale/en/educational';

export default function InstructionGuideHowToIssue() {
  const { setCoachMark } = useCoachMarkal();

  return (
    <InstructionGuide
      storageKey={instructionGuideKeys.how_to_issue_a_pda}
      title={instructionGuide.issuePda.title}
      desc={instructionGuide.issuePda.description}
      btnText={instructionGuide.issuePda.btn_text}
      videoUrl={instructionGuide.issuePda.video_link}
      onCloseModal={() => {
        setCoachMark({
          key: coachMarkKeys.start_issuing_now,
          value: true,
        });
      }}
    />
  );
}
