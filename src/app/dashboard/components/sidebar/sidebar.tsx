'use client';
import { useState } from 'react';

import Logo from '@/components/logo/logo';
import routes from '@/constants/routes';
import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box, Drawer, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { GridMenuIcon } from '@mui/x-data-grid';

import AuthComponent from '../auth-component/auth-component';
import MenuContainer from './menu-container';
import { drawerWidth } from './styles';
const styles = {
  background: '#F6F4FA',
  pt: 5,
  pb: 2,
  px: 2.5,
};

function MobileSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      <Stack
        display={{
          xs: 'flex',
          lg: 'none',
        }}
        direction="row"
        justifyContent="space-between"
        px={CONTAINER_PX}
        py={4}
      >
        <Box>
          <Logo href={routes.dashboard.storage} />
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <GridMenuIcon />
        </IconButton>
      </Stack>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor="right"
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgb(26 4 45 / 50%)',
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            ...styles,
          },
        }}
      >
        <Stack
          justifyContent="space-between"
          flexDirection="column"
          sx={{
            height: 'calc(100% - 40px)',
          }}
        >
          <MenuContainer onCloseSidebar={handleDrawerClose} />
          <AuthComponent
            id="profile-button"
            controlId="profile-menu"
            onCloseSidebar={handleDrawerClose}
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      <MobileSidebar />
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            ...styles,
          },
        }}
        open
      >
        <Box sx={{ pl: 0.5 }}>
          <Logo href={routes.dashboard.storage} />
        </Box>
        <Stack
          justifyContent="space-between"
          flexDirection="column"
          sx={{
            height: 'calc(100% - 40px)',
          }}
        >
          <MenuContainer />
          <AuthComponent id="profile-button" controlId="profile-menu" />
        </Stack>
      </Drawer>
    </>
  );
}
