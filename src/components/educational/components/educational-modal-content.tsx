'use client';

import { FC } from 'react';

import BenefitsIcon from '@/components/icons/benefits';
import JoinClickIcon from '@/components/icons/join-click';
import PoolTogetherIcon from '@/components/icons/pool-together';
import useEducational from '@/hooks/use-educational';
import { instructionGuide } from '@/locale/en/educational';

import { Button, Stack, SvgIconProps, Typography } from '@mui/material';

import EducationalModalCards from './educational-modal-cards';

type Props = {
  onClose: () => void;
};

export default function EducationalModalContent({ onClose }: Props) {
  const { setEducational } = useEducational();

  const cards: { title: string; icon: FC<SvgIconProps> }[] = [
    {
      title: instructionGuide.claim_your_first_pda.cards.unlock_benefits,
      icon: BenefitsIcon,
    },
    {
      title: instructionGuide.claim_your_first_pda.cards.join_other_platforms,
      icon: JoinClickIcon,
    },
    {
      title:
        instructionGuide.claim_your_first_pda.cards
          .win_prizes_with_pool_together,
      icon: PoolTogetherIcon,
    },
  ];

  return (
    <Stack sx={{ height: '100%' }}>
      <Stack mt={3} mb={5}>
        <Typography variant="h4" mb={1}>
          {instructionGuide.claim_your_first_pda.title}
        </Typography>
        <Typography variant="body1">
          {instructionGuide.claim_your_first_pda.description}
        </Typography>
      </Stack>
      <Typography mb={3}>
        {instructionGuide.claim_your_first_pda.cards.title}
      </Typography>
      <Stack direction="row" gap={1} mb={5}>
        <EducationalModalCards cards={cards} />
      </Stack>
      <Button
        variant="contained"
        onClick={() => {
          setEducational({
            key: 'start-using-pda',
            value: '31181920-6eff-4314-a8ea-0177a848ebca',
          });
          onClose();
        }}
      >
        {instructionGuide.claim_your_first_pda.textBtn}
      </Button>
    </Stack>
  );
}
