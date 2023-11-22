'use client';

import { dataModelCard } from '@/locale/en/datamodel';

import { Button, Stack } from '@mui/material';

type Props = {
  issueHref: string;
  learnMoreAction: () => void;
};

export default function CardButtons({ issueHref, learnMoreAction }: Props) {
  return (
    <Stack direction="row" gap={1}>
      <Button size="small" variant="contained" href={issueHref}>
        {dataModelCard.issue}
      </Button>
      <Button size="small" variant="outlined" onClick={learnMoreAction}>
        {dataModelCard.learn_more}
      </Button>
    </Stack>
  );
}
