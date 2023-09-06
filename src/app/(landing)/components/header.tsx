'use client';
import Link from 'next/link';

import GTWLink from '@/components/gtw-link';
import { GatewayIcon } from '@/components/icons/gateway';
import routes from '@/constants/routes';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import HeaderIcon from './header-icon';

export default function Header() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '29px',
        left: 0,
        width: '100%',
      }}
    >
      <Container
        disableGutters
        sx={(theme) => ({
          maxWidth: 1152,
          position: 'relative',
          ':before': {
            content: '""',
            position: 'absolute',
            bottom: '-31px',
            left: 0,
            width: '100%',
            height: '1px',
            opacity: 0.2,
            backgroundColor: '#fff',
          },
          [theme.breakpoints.down('lg')]: {
            maxWidth: '90%',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            width: 42,
            height: 42,
            svg: {
              width: 42,
            },
          }}
        >
          <HeaderIcon withName />
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <GTWLink href="/" sx={{ color: '#fff', textDecoration: 'none' }}>
            Learn
          </GTWLink>
          <GTWLink
            href="/build"
            sx={{ color: '#fff', textDecoration: 'none', marginLeft: '21px' }}
          >
            Build
          </GTWLink>
        </Stack>
        {/* <Stack direction="row" gap={1} justifyContent="center">
          <Button component={Link} href={routes.auth} variant="outlined">
            Explorer
          </Button>
          <Button component={Link} href={routes.auth} variant="contained">
            Open Dashboard
          </Button>
        </Stack> */}
      </Container>
    </Box>
  );
}
