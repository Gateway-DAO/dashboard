'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { GatewaySquaredIcon } from '@/components/icons';
import { common } from '@/locale/en/common';

import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Typography,
  IconButton,
  Drawer,
  Divider,
} from '@mui/material';
import { unstable_getScrollbarSize as getScrollbarSize } from '@mui/utils';

import { links } from './links';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HamburgerMenu({ isOpen, onClose }: Props) {
  const scrollBarSize = getScrollbarSize(window.document);
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
            paddingTop: 64 / 8,
            justifyContent: 'space-between',
          },
        }}
      >
        <span />
        <Stack direction="column" divider={<Divider />}>
          {links.map((link) => (
            <Button
              component={Link}
              key={link.label}
              href={link.href}
              color="inherit"
              onClick={onClose}
              sx={{
                borderRadius: 0,
                py: 2,
                px: 3,
                justifyContent: 'space-between',
              }}
            >
              <Typography component="span" variant="h4">
                {link.label}
              </Typography>
              <ChevronRightOutlinedIcon
                sx={{
                  mr: isOpen ? `${scrollBarSize}px` : '0',
                }}
              />
            </Button>
          ))}
        </Stack>
        <Button
          component={Link}
          href="#"
          variant="outlined"
          color="white"
          onClick={onClose}
          size="large"
          sx={{
            mx: 3,
            mb: 3,
          }}
        >
          Open dashboard
        </Button>
      </Drawer>
    </>
  );
}
