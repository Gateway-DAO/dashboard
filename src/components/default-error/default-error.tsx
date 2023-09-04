import Link from 'next/link';

import { errorMessages } from '@/locale/en/errors';

import { Box, Button, Stack, Typography } from '@mui/material';

import GatewayBrokenIcon from '../icons/gateway-broken';

type Props = {
  href?: string;
  message?: string;
}

export default function DefaultError({ href = "/", message = errorMessages["page-not-found"] }: Props): JSX.Element {
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
          <Typography variant="body1">{message}</Typography>
        </Box>
        <Link passHref href={href}>
          <Button size="large" variant="contained">
            Back to home
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
