import Link from 'next/link';

import { Box, Button, Stack, Typography } from '@mui/material';

import { GatewayBrokenIcon } from '../icons/gateway-broken';

export default function DefaultError(): JSX.Element {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Stack gap={4}>
        <GatewayBrokenIcon
          sx={{
            width: '160px',
            height: 'auto',
          }}
        />
        <Box>
          <Typography variant="h3">Something went wrong</Typography>
          <Typography variant="body1">Page not found.</Typography>
        </Box>
        <Link passHref href="/">
          <Button size="large" variant="contained">
            Back to home
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
