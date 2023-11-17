'use client';

import HelpCtaCard from '@/components/help-cta-card/help-cta-card';
import HelpCtaVideoCard from '@/components/help-cta-video-card/help-cta-video-card';
import DataSquaredIcon from '@/components/icons/data-squared';

import { Stack } from '@mui/material';

export default function HelpCards() {
  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <HelpCtaCard
        title="Issue a PDA now!"
        desc="Quick, non-code feature for issuing PDAs in a few steps. "
        btnText="Issue Now"
        btnLink=""
        icon={DataSquaredIcon}
      />
      <HelpCtaVideoCard
        title="How to issue a PDA"
        desc="We will show you step by step how to send a PDA with our non code application"
        btnText="Play video"
        btnLink=""
      />
    </Stack>
  );
}
