'use client';
import Link from 'next/link';

import routes from '@/constants/routes';

import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Button, Stack, Typography, Drawer, Divider } from '@mui/material';
import { unstable_getScrollbarSize as getScrollbarSize } from '@mui/utils';

import { links } from './links';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function HamburgerMenu({ isOpen, onClose }: Props) {
  const scrollBarSize =
    typeof window !== 'undefined' ? getScrollbarSize(window.document) : 0;
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
          href={routes.auth}
          variant="outlined"
          color="white"
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
