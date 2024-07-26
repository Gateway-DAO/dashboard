'use client';
import { useState, useEffect } from 'react';

import { GatewaySquaredIcon } from '@/components/icons';
import { common } from '@/locale/en/common';

import { AppBar, Toolbar, Button, Stack, Typography } from '@mui/material';

const lightPink = '#E6D5FA';
const darkPink = '#771AC9';

export default function Nav() {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 50;
    }
    return false;
  });

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      elevation={0}
      component="nav"
      sx={{
        background: scrolled ? '#fff' : 'transparent',
        color: scrolled ? '#000' : '#fff',
        transitionProperty: 'background',
        transitionDuration: '0.25s',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" gap={2}>
          <Stack direction="row" gap={1} alignItems="center">
            <GatewaySquaredIcon
              sx={{
                width: 40,
                height: 40,
                path: {
                  transition: 'fill 0.25s',
                },
              }}
              shapeProps={{
                fill: scrolled ? lightPink : darkPink,
              }}
              backgroundProps={{
                fill: scrolled ? darkPink : lightPink,
                fillOpacity: 1,
              }}
              suppressHydrationWarning
            />
            <Typography
              component="h1"
              ml={1}
              color="inherit"
              fontWeight="bold"
              sx={{
                transition: 'color 0.25s',
              }}
            >
              {common.general.gateway}
            </Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <Button color="inherit">Docs</Button>
            <Button color="inherit">Blog</Button>
            <Button color="inherit">Ecosystem</Button>
            <Button color="inherit">Explorer</Button>
          </Stack>
        </Stack>
        <Stack direction="row" gap={1} justifySelf="flex-end">
          <Button color={scrolled ? 'primary' : 'white'} variant="outlined">
            Open dashboard
          </Button>
          <Button color={scrolled ? 'primary' : 'white'} variant="contained">
            Read documentation
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
