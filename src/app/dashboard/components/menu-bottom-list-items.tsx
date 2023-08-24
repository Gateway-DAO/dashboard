"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { useWindowSize } from '@react-hookz/web';


import MenuIcon from "@mui/icons-material/Menu";
import { BottomNavigation, BottomNavigationAction, List, Modal, Stack, useTheme } from '@mui/material';

import GTWMenuItem, { GTWMenuItemProps } from './menu-item/menu-item';

type Props = {
  activePath: string;
  bottomItems: GTWMenuItemProps[];
  menuItems: GTWMenuItemProps[];
}

const useMenuState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const theme = useTheme();
  const { width } = useWindowSize()

  useEffect(() => {
    if (isMenuOpen && width >= theme.breakpoints.values.lg) {
      setIsMenuOpen(false);
    }
  }, [width, theme.breakpoints.values.lg, isMenuOpen])

  return { isMenuOpen, setIsMenuOpen };
}

/**
 * List all menu items of the mobile user dashboard
 */
//TODO: Make it reusable across dashboards
//TODO: Only mount component on mobile, so it doesn't affect performance on desktop and remount the state of the component
export default function MenuBottomListItems({ activePath, bottomItems, menuItems }: Props) {
  const { isMenuOpen, setIsMenuOpen } = useMenuState();

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    if (newValue !== "menu") {
      setIsMenuOpen(false);
      return;
    }
    setIsMenuOpen(open => !open);
  };


  return <>
    <Modal hideBackdrop open={isMenuOpen} sx={{
      bottom: 56,
    }} onClose={() => setIsMenuOpen(false)}>
      <List sx={{
        bgcolor: "background.default",
        px: CONTAINER_PX,
        height: "100%"
      }}>
        {menuItems.map((item) => (
          <GTWMenuItem
            key={item.name}
            active={activePath === item.href}
            onClick={() => setIsMenuOpen(false)}
            {...item}
          />
        ))}
      </List>
    </Modal>
    <BottomNavigation value={isMenuOpen ? 'menu' : activePath} onChange={handleChange} sx={{
      position: "fixed", bottom: 0, left: 0, right: 0, display: {
        xs: "flex",
        lg: "none"
      },
      zIndex: 10
    }}>
      {bottomItems.map(({ icon: Icon, ...item }) => (
        <BottomNavigationAction
          key={item.name}
          component={Link}
          href={item.href}
          label={item.name}
          value={item.href}
          aria-label={item.name}
          icon={<Icon />} />
      ))}
      <BottomNavigationAction
        label="Menu"
        value="menu"
        aria-label='Menu'
        icon={<MenuIcon />} />
    </BottomNavigation>
  </>;
}
