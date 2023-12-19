import Link from 'next/link';

import GTWLogo from '@/components/gtw-logo/gtw-logo';
import routes from '@/constants/routes';
import { currentEnv } from '@/utils/env';

import { Box, Chip } from '@mui/material';

type Props = {
  theme?: 'light' | 'dark';
};

export default function Logo({ theme = 'light' }: Props) {
  return (
    <Box
      component={Link}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
      }}
      href={routes.explorer.root}
      flexGrow={0}
    >
      <GTWLogo theme={theme} />
      {currentEnv === 'production' ? (
        <Chip
          size="small"
          color="primary"
          label="Explorer"
          sx={{ ml: 1, fontWeight: 700 }}
        />
      ) : (
        <Chip
          size="small"
          color="warning"
          label="Sandbox Explorer"
          sx={{ ml: 1, fontWeight: 700 }}
        />
      )}
    </Box>
  );
}
