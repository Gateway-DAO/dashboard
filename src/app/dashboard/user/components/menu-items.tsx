
"use client";

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SquaredArrowDown } from '@/components/icons/squared-arrow-down';
import { SquaredArrowRight } from '@/components/icons/squared-arrow-right';
import { WalletIcon } from '@/components/icons/wallet';
import GTWMenuItem, { GTWMenuItemProps } from '@/components/menu-item/menu-item';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


export default function MenuItems() {
  const searchParams = useSearchParams()
  let activePath = usePathname();
  if (activePath === '/dashboard/user/proof' && searchParams.has('aa')) {
    activePath = '/dashboard/user/data-requests';
  } else {
    activePath = '/dashboard/user/data-assets';
  }

  const menuItems: GTWMenuItemProps[] = [
    {
      name: 'Home',
      link: '/dashboard/user/',
      icon: HomeOutlinedIcon,
    },
    {
      name: 'Issued data assets',
      link: '/dashboard/user/issued',
      icon: SquaredArrowRight,
    },
    {
      name: 'Data requests',
      link: '/dashboard/user/data-requests',
      icon: SquaredArrowDown,
    },
    {
      name: 'My data assets',
      link: '/dashboard/user/data-assets',
      icon: WalletIcon,
    },
    {
      name: 'Activity',
      link: '/dashboard/user/activity',
      icon: AccessTimeIcon,
    },
    {
      name: 'Notifications',
      link: '/dashboard/user/notifications',
      icon: NotificationsNoneIcon,
    },
  ];

  return menuItems.map((item) => (
    <GTWMenuItem
      key={item.name}
      active={activePath === item.link}
      {...item}
    />
  )
  );
}
