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
export const dashboardOrgMenuItems = (organization: string): GTWMenuItemSettings[] => [
  {
    name: 'Issued data assets',
    href: routes.dashboardOrgIssuedAssets.replace("[id]", organization),
    activeHrefs: [routes.dashboardOrgIssuedAssets.replace("[id]", organization)],
    icon: DataOutlinedIcon,
    activeIcon: DataFilledIcon,
  },
  {
    name: 'Data requests',
    href: routes.dashboardOrgRequests.replace("[id]", organization),
    activeHrefs: [routes.dashboardOrgRequests.replace("[id]", organization)],
    icon: DataRequestOutlinedIcon,
    activeIcon: DataRequestFilledIcon,
  },
  {
    name: 'Received data proofs',
    href: routes.dashboardOrgReceivedProofs.replace("[id]", organization),
    activeHrefs: [routes.dashboardOrgReceivedProofs.replace("[id]", organization)],
    icon: DataProofOutlinedIcon,
    activeIcon: DataProofFilledIcon,
  },
];

export default dashboardOrgMenuItems;
