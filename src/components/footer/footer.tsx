import { ReactNode } from 'react';

import { Container, Stack } from '@mui/material';

import FooterContent from './content';
import Investors from './investors';

type Props = {
  color?: 'primary' | 'transparent';
  slot?: ReactNode;
};

export default function Footer({ color = 'primary', slot }: Props) {
  return (
    <Stack
      component="footer"
      sx={{
        backgroundColor: color === 'primary' ? 'primary.main' : undefined,
      }}
    >
      <Stack
        component={Container}
        sx={{
          pt: {
            xs: 6,
            md: 10,
          },
          pb: {
            xs: 6,
            md: 20,
          },
          gap: {
            xs: 6,
            md: 10,
          },
        }}
      >
        {slot}
        <FooterContent />
      </Stack>
    </Stack>
  );
}
