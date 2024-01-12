'use client';

import BenefitsIcon from '@/components/icons/benefits';
import JoinClickIcon from '@/components/icons/join-click';
import PoolTogetherIcon from '@/components/icons/pool-together';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import useEducational from '@/hooks/use-educational';
import { instructionGuide } from '@/locale/en/educational';

import { Button, Card, Stack, Typography } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function EducationalModal({ open, onClose }: Props) {
  const { setEducational } = useEducational();

  const cards: { title: string; icon: any }[] = [
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
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />
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
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Stack
                key={i}
                component={Card}
                alignItems="center"
                justifyContent="center"
                gap={2}
                sx={{
                  backgroundColor: 'primary.light',
                  textAlign: 'center',
                  p: 3,
                  minHeight: 162,
                  width: '100%',
                  boxShadow: 'none',
                }}
              >
                <Icon sx={{ height: 49, width: 'auto', maxWidth: 90 }} />
                <Typography>{card.title}</Typography>
              </Stack>
            );
          })}
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
    </ModalRight>
  );
}
