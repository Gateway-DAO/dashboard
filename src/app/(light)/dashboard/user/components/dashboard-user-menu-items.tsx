import { GTWMenuItemProps } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import DataFilledIcon from '@/components/icons/data-filled';
import DataProofFilledIcon from '@/components/icons/data-proof-filled';
import DataProofOutlinedIcon from '@/components/icons/data-proof-outlined';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';
import routes from '@/constants/routes';

// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemProps[] = [
  {
    name: 'Home',
    href: routes.dashboardUser,
    icon: HomeOutlinedIcon,
  },
  {
    name: 'Data assets',
    href: routes.dashboardUserReceivedAssets,
    icon: DataFilledIcon,
  },
  {
    name: 'Data requests',
    href: routes.dashboardUserRequests,
    icon: DataRequestOutlinedIcon,
  },
  {
    name: 'Data proofs',
    href: routes.dashboardUserProofs,
    icon: DataProofOutlinedIcon,
    activeIcon: DataProofFilledIcon,
  },
];

export default dashboardUserMenuItems;
