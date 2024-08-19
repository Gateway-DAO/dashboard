'use client';
import Link from 'next/link';
import { useEffect } from 'react';

import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Stack, Typography, Drawer, Divider } from '@mui/material';
import { unstable_getScrollbarSize as getScrollbarSize } from '@mui/utils';

import { NavLink } from './types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  buttons: NavLink[];
};

export default function HamburgerMenu({
  isOpen,
  onClose,
  links,
  buttons,
}: Props) {
  const scrollBarSize =
    typeof window !== 'undefined' ? getScrollbarSize(window.document) : 0;

  useEffect(() => {
    const onResize = () => {
      if (isOpen && window.innerWidth >= 1200) {
        onClose();
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  return (
    <>
      <Drawer
        anchor="top"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: '100%',
            height: '100%',
            paddingTop: 108 / 8,
            justifyContent: 'space-between',
            backgroundColor: '#1e1e1e',
            color: 'white.main',
          },
        }}
      >
        <span />
        <Stack
          direction="column"
          divider={<Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />}
        >
          {links.map((link) => {
            const ChevronIcon = link.externalIcon
              ? OpenInNewIcon
              : ChevronRightOutlinedIcon;

            return (
              <Button
                key={link.label}
                {...(link.href && {
                  component: Link,
                  href: link.href,
                  target: link.target,
                })}
                onClick={() => {
                  onClose();
                  link.onClick && link.onClick();
                }}
                color="inherit"
                sx={{
                  borderRadius: 0,
                  py: 2,
                  px: {
                    xs: 3,
                    md: 6,
                  },
                  justifyContent: 'space-between',
                }}
              >
                <Typography component="span" variant="h4">
                  {link.label}
                </Typography>
                <ChevronIcon
                  sx={{
                    mr: isOpen ? `${scrollBarSize}px` : '0',
                  }}
                />
              </Button>
            );
          })}
        </Stack>
        <Stack
          direction="column"
          sx={{
            mx: 3,
            mb: 3,
          }}
          gap={2}
        >
          {buttons.map((button) => (
            <Button
              key={button.label}
              {...(button.href && {
                component: Link,
                href: button.href,
                target: button.target,
              })}
              onClick={() => {
                onClose();
                button.onClick && button.onClick();
              }}
              variant={button.variant}
              color={button.color ?? 'white'}
              size="large"
            >
              {button.label}
            </Button>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
