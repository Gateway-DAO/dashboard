'use client';
import { PropsWithChildren, useState } from 'react';

import Logo from '@/components/logo/logo';
import routes from '@/constants/routes';
import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box, Drawer, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { GridMenuIcon } from '@mui/x-data-grid';
const drawerWidth = 300;

const styles = {
  background: '#F6F4FA',
  pt: 5,
  pb: 2,
  px: 2.5,
};

export default function Sidebar({ children }: PropsWithChildren) {
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
        px={CONTAINER_PX}
        py={4}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <GridMenuIcon />
        </IconButton>
        <Box sx={{ pl: 0.5 }}>
          <Logo href={routes.dashboard.storage} />
        </Box>
      </Stack>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
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
        {children}
      </Drawer>
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
        {children}
      </Drawer>
      {/* <Stack
        component="aside"
        sx={{
          pt: 5,
          pb: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
          maxWidth: drawerWidth,
          width: '100%',
          px: 2.5,
          position: 'fixed',
          height: '100%',
          boxSizing: 'border-box',

          display: {
            xs: isOpen ? 'flex' : 'none',
            lg: 'flex',
          },
        }}
      >
        {children}
      </Stack> */}
    </>
  );
}
