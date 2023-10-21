'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { useToggle } from '@react-hookz/web';

import { MenuOutlined } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { GTWMenuItemSettings } from './menu-item/menu-item';

type Props = {
  menuItems: GTWMenuItemSettings[];
  developerItems?: GTWMenuItemSettings[];
};

/**
 * List all menu items of the mobile user dashboard
 */
export default function MenuBottomListItems({
  menuItems,
  developerItems,
}: Props) {
  const activePath = usePathname();
  const [isHamburgerVisible, toggleHamburgerVisible] = useToggle();

  const activeTab = isHamburgerVisible ? 'hamburger' : activePath;

  const bottomBarMenu = useMemo(
    () => menuItems.filter((item) => item.navbar),
    [menuItems]
  );
  const hamburgerMenu = useMemo(
    () => menuItems.filter((item) => !item.navbar),
    [menuItems]
  );

  const onClose = () => toggleHamburgerVisible(false);

  return (
    <>
      <BottomNavigation
        value={activeTab}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: {
            xs: 'flex',
            lg: 'none',
          },
          zIndex: 1000,
        }}
      >
        {bottomBarMenu.map(
          ({ icon: Icon, activeIcon: ActiveIcon, activeHrefs, ...item }) => {
            const isActive =
              !isHamburgerVisible &&
              activeHrefs.some((path) => activePath.includes(path));
            return (
              <BottomNavigationAction
                key={item.name}
                component={Link}
                href={item.href}
                label={item.name}
                value={item.href}
                aria-label={item.name}
                icon={isActive && ActiveIcon ? <ActiveIcon /> : <Icon />}
                onClick={onClose}
              />
            );
          }
        )}
        <BottomNavigationAction
          label="More items"
          aria-label="More items"
          icon={<MenuOutlined />}
          onClick={toggleHamburgerVisible}
          value="hamburger"
        />
      </BottomNavigation>
      <Drawer
        anchor="bottom"
        open={isHamburgerVisible}
        onClose={onClose}
        sx={{
          '&, .MuiDrawer-paper, .MuiModal-backdrop': {
            bottom: 56,
            zIndex: 900,
          },
          '.MuiDrawer-paper': {
            borderRadius: '24px 24px 0 0',
            boxShadow: 'none',
            borderBottom: 1,
            borderBottomColor: 'divider',
          },
        }}
      >
        <List sx={{ py: 3 }}>
          {hamburgerMenu.map(
            ({ icon: Icon, activeIcon: ActiveIcon, activeHrefs, ...item }) => {
              const isActive = activeHrefs.some((path) =>
                activePath.includes(path)
              );
              return (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={onClose}
                    sx={{
                      color: isActive ? 'primary.main' : undefined,
                      px: 3,
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {isActive && ActiveIcon ? <ActiveIcon /> : <Icon />}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            }
          )}
        </List>
        {developerItems && (
          <>
            <Typography variant="caption" sx={{ mt: 2, px: 3 }}>
              Developers
            </Typography>
            <List sx={{ py: 3 }}>
              {developerItems.map(
                ({
                  icon: Icon,
                  activeIcon: ActiveIcon,
                  activeHrefs,
                  ...item
                }) => {
                  const isActive = activeHrefs.some((path) =>
                    activePath.includes(path)
                  );
                  return (
                    <ListItem key={item.name} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={item.href}
                        onClick={onClose}
                        sx={{
                          color: isActive ? 'primary.main' : undefined,
                          px: 3,
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                          {isActive && ActiveIcon ? <ActiveIcon /> : <Icon />}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                }
              )}
            </List>
          </>
        )}
      </Drawer>
    </>
  );
}
