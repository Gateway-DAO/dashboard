'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { GatewaySquaredIcon } from '@/components/icons';
import { common } from '@/locale/en/common';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Typography,
  IconButton,
  Container,
} from '@mui/material';

import HamburgerMenu from './hamburger-menu';
import { links } from './links';

const lightPink = '#E6D5FA';
const darkPink = '#771AC9';

export default function Nav() {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 50;
    }
    return false;
  });
  const lastScrolledState = useRef<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (state: boolean) => () => {
    if (!state) {
      setScrolled(lastScrolledState.current || false);
    }
    setIsMenuOpen(state);
  };

  useEffect(() => {
    const handleScroll = () => {
      let isScrolled = false;
      if (window.scrollY > 50) {
        isScrolled = true;
      } else {
        isScrolled = false;
      }
      lastScrolledState.current = isScrolled;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isScrolled = scrolled && !isMenuOpen;

  return (
    <>
      <AppBar
        elevation={0}
        component="nav"
        sx={{
          background: isScrolled ? '#fff' : 'transparent',
          color: isScrolled ? '#000' : '#fff',
          transitionProperty: 'background',
          transitionDuration: '0.25s',
          zIndex: 1300,
        }}
      >
        <Container
          component={Toolbar}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
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
                  fill: isScrolled ? lightPink : darkPink,
                }}
                backgroundProps={{
                  fill: isScrolled ? darkPink : lightPink,
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
            <Stack
              direction="row"
              gap={2}
              display={{
                xs: 'none',
                md: 'flex',
              }}
            >
              {links.map((link) => (
                <Button
                  component={Link}
                  key={link.label}
                  href={link.href}
                  color="inherit"
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            display={{
              xs: 'none',
              md: 'flex',
            }}
          >
            <Button color={isScrolled ? 'primary' : 'white'} variant="outlined">
              Open dashboard
            </Button>
            <Button
              color={isScrolled ? 'primary' : 'white'}
              variant="contained"
            >
              Read documentation
            </Button>
          </Stack>
          <IconButton
            color={isScrolled ? 'primary' : 'white'}
            sx={{
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
            onClick={toggleMenu(!isMenuOpen)}
          >
            {!isMenuOpen ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </Container>
      </AppBar>
      <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu(false)} />
    </>
  );
}
