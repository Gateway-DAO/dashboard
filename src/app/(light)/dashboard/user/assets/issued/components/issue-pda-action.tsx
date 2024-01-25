'use client';

import Educational from '@/components/educational/educational';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import { educationalKeys, helpStorageKeys } from '@/constants/educational';
import routes from '@/constants/routes';
import useEducational from '@/hooks/use-educational';
import useLocalStorageHelpCard from '@/hooks/use-help-card';
import { instructionGuide } from '@/locale/en/educational';
import { pdas } from '@/locale/en/pda';

import { Button } from '@mui/material';

export default function IssuePdaAction() {
  const { onRemoveStorage } = useLocalStorageHelpCard({
    storageKey: helpStorageKeys.help_cta_video_how_to_use_pda,
  });

  const { showEducational, setEducational } = useEducational({
    key: educationalKeys.start_issuing_now,
    value: true,
  });

  return (
    <Educational
      title={instructionGuide.start_issuing_now.title}
      description={instructionGuide.start_issuing_now.description}
      textBtn={instructionGuide.start_issuing_now.btn_text}
      href={routes.dashboard.user.issue}
      onClickCard={() => {
        onRemoveStorage();
        setEducational(null);
      }}
      onClose={() => {
        onRemoveStorage();
        setEducational(null);
      }}
      open={showEducational}
      position="bottom"
    >
      <Button
        variant="contained"
        size="large"
        endIcon={<DataOutlinedIcon />}
        href={routes.dashboard.user.issue}
      >
        {pdas.issue_a_pda}
      </Button>
    </Educational>
  );
}
