import { GTWMenuItemSettings } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import DataProofOutlinedIcon from '@/components/icons/data-proof-outlined';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';
import DataRequestTemplateOutlinedIcon from '@/components/icons/data-request-template-outlined';
import routes from '@/constants/routes';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Data assets',
    href: routes.dashboardUserReceivedAssets,
    activeHrefs: [
      routes.dashboardUserReceivedAssets,
      routes.dashboardUserIssuedAssets,
      routes.dashboardUserAsset(''),
    ],
    icon: DataOutlinedIcon,
  },
  {
    name: 'Data requests',
    href: routes.dashboardUserRequests,
    activeHrefs: [
      routes.dashboardUserRequests,
      routes.dashboardUserRequest(''),
    ],
    icon: DataRequestOutlinedIcon,
  },
  {
    name: 'Request templates',
    href: routes.dashboardUserRequestTemplates,
    activeHrefs: [routes.dashboardUserRequestTemplates],
    icon: DataRequestTemplateOutlinedIcon,
  },
  {
    name: 'Data proofs',
    href: routes.dashboardUserReceivedProofs,
    activeHrefs: [
      routes.dashboardUserReceivedProofs,
      routes.dashboardUserSentProofs,
      routes.dashboardUserProof(''),
    ],
    icon: DataProofOutlinedIcon,
  },
];

export default dashboardUserMenuItems;
