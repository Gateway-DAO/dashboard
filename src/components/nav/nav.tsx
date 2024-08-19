'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';

import { OpenInNew } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  IconButton,
  Container,
  IconButtonOwnProps,
  ButtonOwnProps,
} from '@mui/material';

import { NavContext } from './context';
import HamburgerMenu from './hamburger-menu';
import { buttonTranslateColor, NavLink, translateColor } from './types';

type Props = {
  compact?: boolean;
  logo?: ReactNode;
  color?: 'white' | 'black';
  links: NavLink[];
  buttons: NavLink[];
  hamburgerButtons: NavLink[];
};

export default function Nav({
  compact,
  color = 'white',
  logo,
  links,
  buttons,
  hamburgerButtons,
}: Props) {
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
    <NavContext.Provider
      value={{
        isScrolled,
        color,
      }}
    >
      <AppBar
        elevation={0}
        component="nav"
        sx={{
          background: isScrolled ? '#fff' : 'transparent',
          color: isScrolled
            ? '#000'
            : isMenuOpen
            ? '#fff'
            : translateColor[color],
          transitionProperty: 'background',
          transitionDuration: '0.25s',
          zIndex: 1300,
        }}
      >
        <Container
          component={Toolbar}
          sx={{ display: 'flex', justifyContent: 'space-between', py: 4 }}
        >
          <Stack direction="row" gap={compact ? 3 : 7}>
            {logo}
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
                  key={link.label}
                  {...(link.href && {
                    component: Link,
                    href: link.href,
                    target: link.target,
                  })}
                  {...(link.onClick && { onClick: link.onClick })}
                  color="inherit"
                  variant="text"
                >
                  {link.label}
                  {link.externalIcon && <OpenInNew sx={{ ml: 1 }} />}
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
            {buttons.map((button) => (
              <Button
                key={button.label}
                {...(button.href && {
                  component: Link,
                  href: button.href,
                  target: button.target,
                })}
                {...(button.onClick && { onClick: button.onClick })}
                color={
                  isScrolled
                    ? 'primary'
                    : (buttonTranslateColor[color] as ButtonOwnProps['color'])
                }
                variant={button.variant}
              >
                {button.label}
              </Button>
            ))}
          </Stack>
          <IconButton
            color={
              isMenuOpen
                ? 'white'
                : isScrolled
                ? 'primary'
                : (buttonTranslateColor[color] as IconButtonOwnProps['color'])
            }
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
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu(false)}
        links={links}
        buttons={hamburgerButtons}
      />
    </NavContext.Provider>
  );
}
