'use client';
import useBreakpoints from '@/hooks/use-breakpoints';

import { Box, Container } from '@mui/material';

import Logo from './logo';
import ExplorerNavbarDesktop from './navbar-desktop';
import ExplorerNavbarMobile from './navbar-mobile';
import ToDashboardLink from './to-dashboard-link';
import ToSandboxOrMainnetLink from './to-sandbox-or-mainnet-link';

export default function ExplorerNavbar() {
  const { isDesktop } = useBreakpoints();
  return (
    <Box
      component="nav"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          direction: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          py: 5,
        }}
      >
        <Logo />
        <ExplorerNavbarDesktop />
        {isDesktop && <ToSandboxOrMainnetLink />}
        {isDesktop && <ToDashboardLink />}
        <ExplorerNavbarMobile />
      </Container>
    </Box>
  );
}
