'use client';

import CoachMark from '@/components/coach-mark/coach-mark';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import { coachMarkKeys } from '@/constants/coach-mark';
import { instructionGuideKeys } from '@/constants/instruction-guide';
import routes from '@/constants/routes';
import useCoachMarkal from '@/hooks/use-coach-mark';
import useLocalStorageInstructionGuide from '@/hooks/use-instruction-guide';
import { coachMark } from '@/locale/en/coach-mark';
import { pdas } from '@/locale/en/pda';

import { Button } from '@mui/material';

type Props = {
  pathnameOrg: string;
};

export default function IssuePdaAction({ pathnameOrg }: Props) {
  const { onRemoveStorage } = useLocalStorageInstructionGuide({
    storageKey: instructionGuideKeys.how_to_use_pda,
  });

  const { showCoachMark, setCoachMark } = useCoachMarkal({
    key: coachMarkKeys.start_issuing_now,
    value: true,
  });

  return (
    <CoachMark
      title={coachMark.start_issuing_now.title}
      description={coachMark.start_issuing_now.description}
      textBtn={coachMark.start_issuing_now.btn_text}
      href={routes.dashboard.user.issue}
      onClickCard={() => {
        onRemoveStorage();
        setCoachMark(null);
      }}
      onClose={() => {
        onRemoveStorage();
        setCoachMark(null);
      }}
      open={showCoachMark}
      position="bottom"
    >
      <Button
        variant="contained"
        size="large"
        endIcon={<DataOutlinedIcon />}
        href={routes.dashboard.org.issue(pathnameOrg)}
        className="issueBtn"
      >
        {pdas.issue_a_pda}
      </Button>
    </CoachMark>
  );
}
