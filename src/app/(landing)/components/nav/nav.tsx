'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

import GatewaySquaredThemedIcon from '@/components/icons/gateway-squared-themed';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';
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

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const lastScrolledState = useRef<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(
    (state: boolean) => () => {
      if (!state) {
        setScrolled(lastScrolledState.current || false);
      }
      setIsMenuOpen(state);
    },
    []
  );

  const onScroll = useCallback(() => {
    const isScrolled = window.scrollY > 50;
    lastScrolledState.current = isScrolled;
    setScrolled(isScrolled);
  }, []);

  useEffect(() => {
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
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
          sx={{ display: 'flex', justifyContent: 'space-between', py: 4 }}
        >
          <Stack direction="row" gap={7}>
            <Stack direction="row" gap={1} alignItems="center">
              <GatewaySquaredThemedIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
                theme={isScrolled ? 'light' : 'dark'}
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
              gap={1}
              display={{
                xs: 'none',
                lg: 'flex',
              }}
            >
              {links.map((link) => (
                <Button
                  component={Link}
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  color="inherit"
                  variant="text"
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
              lg: 'flex',
            }}
          >
            <Button
              component={Link}
              href={routes.auth}
              color={isScrolled ? 'primary' : 'white'}
              variant="outlined"
            >
              Open dashboard
            </Button>
            <Button
              component={Link}
              href={documentationRoutes.home}
              target="_blank"
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
                lg: 'none',
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
