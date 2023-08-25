
import { SquaredArrowDown } from '@/components/icons/squared-arrow-down';
import { SquaredArrowRight } from '@/components/icons/squared-arrow-right';
import { WalletIcon } from '@/components/icons/wallet';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { GTWMenuItemProps } from '../../components/menu-item/menu-item';

/**
 * List all menu items of the user dashboard
 */
export const dashboardOrgMenuItems: GTWMenuItemProps[] = [
  {
    name: 'Home',
    href: '/',
    icon: HomeOutlinedIcon,
  },
  {
    name: 'Issued data assets',
    href: '/issued',
    icon: SquaredArrowRight,
  },
  {
    name: 'Data requests',
    href: '/user/data-requests',
    icon: SquaredArrowDown,
  },
  {
    name: 'Org data assets',
    href: '/dashboard',
    icon: WalletIcon,
  },
  {
    name: 'Data proofs',
    href: '/dashboard',
    icon: WalletIcon,
  },
  {
    name: 'Saved and created data models',
    href: '/dashboard',
    icon: WalletIcon,
  },
  {
    name: 'Activity',
    href: '/activity',
    icon: AccessTimeIcon,
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: NotificationsNoneIcon,
  },
];

export default dashboardOrgMenuItems;
