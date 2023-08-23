
"use client";

import { useRouter } from 'next/navigation';

import GTWMenuItem, { GTWMenuItemProps } from '@/app/dashboard/components/menu-item/menu-item';
import { SquaredArrowDown } from '@/components/icons/squared-arrow-down';
import { SquaredArrowRight } from '@/components/icons/squared-arrow-right';
import { WalletIcon } from '@/components/icons/wallet';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import useUserDashboardActivePath from './use-user-dashboard-active-path';

/**
 * List all menu items of the user dashboard
 */
const menuItems: GTWMenuItemProps[] = [
  {
    name: 'Home',
    href: '/dashboard/user',
    icon: HomeOutlinedIcon,
  },
  {
    name: 'Issued data assets',
    href: '/dashboard/user/issued',
    icon: SquaredArrowRight,
  },
  {
    name: 'Data requests',
    href: '/dashboard/user/data-requests',
    icon: SquaredArrowDown,
  },
  {
    name: 'My data assets',
    href: '/dashboard/user/data-assets',
    icon: WalletIcon,
  },
  {
    name: 'Activity',
    href: '/dashboard/user/activity',
    icon: AccessTimeIcon,
  },
  {
    name: 'Notifications',
    href: '/dashboard/user/notifications',
    icon: NotificationsNoneIcon,
  },
];

/**
 * List all menu items of the desktop user dashboard
 */
export default function MenuItems() {
  const activePath = useUserDashboardActivePath();

  return menuItems.map((item) => (
    <GTWMenuItem
      key={item.name}
      active={activePath === item.href}
      {...item}
    />
  )
  );
}

/**
 * List all menu items of the mobile user dashboard
 */
export function MenuBottombarItems() {
  const router = useRouter();
  let activePath = useUserDashboardActivePath();
  console.log(activePath)

  const items = [menuItems[0], menuItems[3]];
  if (!items.some(item => item.href === activePath)) {
    activePath = "menu";
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    if (newValue === "menu") return;
    router.push(newValue);
  }


  return <BottomNavigation value={activePath} onChange={handleChange} sx={{
    position: "fixed", bottom: 0, left: 0, right: 0, display: {
      xs: "flex",
      lg: "none"
    }
  }}>
    {items.map(({ icon: Icon, ...item }) => (
      <BottomNavigationAction
        key={item.name}
        label={item.name}
        value={item.href}
        icon={<Icon />}
      />
    ))}
    <BottomNavigationAction
      label="Menu"
      value="menu"
      icon={<MenuIcon />}
    />
  </BottomNavigation>
}
