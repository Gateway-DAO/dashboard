'use client';

import HelpCtaCard from '@/components/help-cta-card/help-cta-card';
import HelpCtaVideoCard from '@/components/help-cta-video-card/help-cta-video-card';
import DataSquaredIcon from '@/components/icons/data-squared';
import routes from '@/constants/routes';
import { pdas } from '@/locale/en/pda';

import { Stack } from '@mui/material';

export default function HelpCards() {
  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <HelpCtaCard
        title={pdas.help_card.title}
        desc={pdas.help_card.description}
        btnText={pdas.help_card.text_button}
        btnLink={routes.dashboard.user.issue}
        icon={DataSquaredIcon}
      />
      <HelpCtaVideoCard
        title={pdas.help_video_card.title}
        desc={pdas.help_video_card.description}
        btnText={pdas.help_video_card.text_button}
        btnLink=""
      />
    </Stack>
  );
}
