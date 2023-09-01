import { GTWMenuItemProps } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import DataProofIcon from '@/components/icons/data-proof';
import { SquaredArrowDown } from '@/components/icons/squared-arrow-down';
import { WalletIcon } from '@/components/icons/wallet';
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
    icon: WalletIcon,
  },
  {
    name: 'Data requests',
    href: routes.dashboardUserRequests,
    icon: SquaredArrowDown,
  },
  {
    name: 'Data proofs',
    href: routes.dashboardUserProofs,
    icon: DataProofIcon,
  },
];

export default dashboardUserMenuItems;
