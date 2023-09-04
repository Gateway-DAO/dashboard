
import DataFilledIcon from '@/components/icons/data-filled';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';

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
    icon: DataRequestOutlinedIcon,
  },
  {
    name: 'Data requests',
    href: '/user/data-requests',
    icon: DataRequestOutlinedIcon,
  },
  {
    name: 'Org data assets',
    href: '/dashboard',
    icon: DataFilledIcon,
  },
  {
    name: 'Data proofs',
    href: '/dashboard',
    icon: DataFilledIcon,
  },
  {
    name: 'Saved and created data models',
    href: '/dashboard',
    icon: DataFilledIcon,
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
