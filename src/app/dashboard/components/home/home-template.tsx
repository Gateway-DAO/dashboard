import { ReactNode } from 'react';

import { home } from '@/locale/en/home';

import { Box } from '@mui/material';
import { Typography } from '@mui/material';

type Props = {
  username: string;
  banner: ReactNode;
  cards: ReactNode;
  instructions: ReactNode;
};

export default function HomeTemplate({
  username,
  banner,
  cards,
  instructions,
}: Props) {
  return (
    <>
      <Typography variant="h3" marginBottom={4} gutterBottom>
        {home.greeting} {username}
      </Typography>
      {banner}
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1,
        }}
      >
        {cards}
      </Box>
      {instructions && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {instructions}
        </Box>
      )}
    </>
  );
}
