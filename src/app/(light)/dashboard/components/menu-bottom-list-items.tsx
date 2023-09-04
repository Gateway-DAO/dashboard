'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

import { GTWMenuItemProps } from './menu-item/menu-item';

type Props = {
  menuItems: GTWMenuItemProps[];
};

/**
 * List all menu items of the mobile user dashboard
 */
export default function MenuBottomListItems({
  menuItems,
}: Props) {
  const activePath = usePathname();

  return (
    <BottomNavigation
      value={activePath}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: {
          xs: 'flex',
          lg: 'none',
        },
        zIndex: 10,
      }}
    >
      {menuItems.map(({ icon: Icon, activeIcon: ActiveIcon, ...item }) => (
        <BottomNavigationAction
          key={item.name}
          component={Link}
          href={item.href}
          label={item.name}
          value={item.href}
          aria-label={item.name}
          icon={activePath === item.href && ActiveIcon ? <ActiveIcon /> : <Icon />}
        />
      ))}
    </BottomNavigation>
  );
}


