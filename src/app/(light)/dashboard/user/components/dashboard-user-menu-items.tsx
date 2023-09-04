import { GTWMenuItemSettings } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import DataFilledIcon from '@/components/icons/data-filled';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import DataProofFilledIcon from '@/components/icons/data-proof-filled';
import DataProofOutlinedIcon from '@/components/icons/data-proof-outlined';
import DataRequestFilledIcon from '@/components/icons/data-request-filled';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';
import routes from '@/constants/routes';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Data assets',
    href: routes.dashboardUserReceivedAssets,
    activeHrefs: [routes.dashboardUserReceivedAssets, routes.dashboardUserIssuedAssets, routes.dashboardUserAsset.replace("[id]", "")],
    icon: DataOutlinedIcon,
    activeIcon: DataFilledIcon,
  },
  {
    name: 'Data requests',
    href: routes.dashboardUserRequests,
    activeHrefs: [routes.dashboardUserRequests, routes.dashboardUserRequest.replace("[id]", "")],
    icon: DataRequestOutlinedIcon,
    activeIcon: DataRequestFilledIcon,
  },
  {
    name: 'Data proofs',
    href: routes.dashboardUserProofs,
    activeHrefs: [routes.dashboardUserProofs, routes.dashboardUserProof.replace("[id]", "")],
    icon: DataProofOutlinedIcon,
    activeIcon: DataProofFilledIcon,
  },
];

export default dashboardUserMenuItems;
