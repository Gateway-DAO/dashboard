'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import React from 'react';

import useBreakpoints from '@/hooks/use-breakpoints';
import { useToggle } from '@react-hookz/web';

import { Close, MenuOutlined } from '@mui/icons-material';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Button,
  Dialog,
  Divider,
  ListItem,
  ListItemButton,
  Slide,
  Stack,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import Logo from './logo';
import explorerMenuItems from './menu-items';
import ToDashboardLink from './to-dashboard-link';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ExplorerNavbarMobile() {
  const activePath = usePathname();
  const [isHamburgerVisible, toggleHamburgerVisible] = useToggle();

  const onClose = useCallback(() => toggleHamburgerVisible(false), []);

  const { isDesktop } = useBreakpoints();

  return (
    <>
      {!isDesktop && (
        <>
          <Button onClick={toggleHamburgerVisible}>
            <MenuOutlined />
          </Button>
          <Dialog
            fullScreen
            open={isHamburgerVisible}
            onClose={onClose}
            TransitionComponent={Transition}
          >
            <Stack
              sx={{
                py: 3,
                backgroundColor: '#212121',
                color: '#fff',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Stack
                gap={2}
                direction="row"
                justifyContent="space-between"
                sx={{ p: 2, mb: 4 }}
              >
                <Logo theme="dark" />
                <Button onClick={toggleHamburgerVisible}>
                  <Close sx={{ color: 'white' }} />
                </Button>
              </Stack>
              <Stack
                flexGrow={1}
                divider={<Divider sx={{ backgroundColor: '#444', mx: 3 }} />}
              >
                {explorerMenuItems.map(({ activeHrefs, ...item }) => {
                  const isActive = activeHrefs.some((path) =>
                    activePath.includes(path)
                  );
                  return (
                    <ListItem key={item.name} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={item.href}
                        onClick={onClose}
                        target={item.externalLink ? '_blank' : '_self'}
                        sx={{
                          color: isActive ? 'primary.main' : undefined,
                          p: 3,
                          fontSize: 34,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {item.name}
                        {item.externalLink && (
                          <LaunchIcon
                            sx={{
                              position: 'relative',
                              left: 8,
                              fontSize: 20,
                              color: 'common.white',
                              top: 3,
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </Stack>
              <Stack sx={{ mx: 3, mb: 2 }}>
                <ToDashboardLink />
              </Stack>
            </Stack>
          </Dialog>
        </>
      )}
    </>
  );
}
