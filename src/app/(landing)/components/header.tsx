import Link from 'next/link';

import GTWLink from '@/components/gtw-link';
import GatewayIcon from '@/components/icons/gateway';
import routes from '@/constants/routes';

import { Box, Button, Stack } from '@mui/material';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
      }}
    >
      <GatewayIcon />
      <Stack direction="row" gap={2} justifyContent="center">
        <GTWLink href="/">Learn</GTWLink>
        <GTWLink href="/build">Build</GTWLink>
      </Stack>
      <Stack direction="row" gap={1} justifyContent="center">
        <Button component={Link} href={routes.auth} variant="outlined">
          Explorer
        </Button>
        <Button component={Link} href={routes.auth} variant="contained">
          Open Dashboard
        </Button>
      </Stack>
    </Box>
  );
}
