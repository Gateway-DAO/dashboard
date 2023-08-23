"use client";
import { GTWMenuItemProps } from '@/app/dashboard/components/menu-item/menu-item';
import { SquaredArrowDown } from '@/components/icons/squared-arrow-down';
import { SquaredArrowRight } from '@/components/icons/squared-arrow-right';
import { WalletIcon } from '@/components/icons/wallet';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

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
    href: '/dashboard/user/issued-data-assets',
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
  // {
  //   name: 'Notifications',
  //   href: '/dashboard/user/notifications',
  //   icon: NotificationsNoneIcon,
  // },
];

export default menuItems;
