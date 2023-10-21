import { GTWMenuItemSettings } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import DataModelOutlinedIcon from '@/components/icons/data-model-outlined';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import DataProofOutlinedIcon from '@/components/icons/data-proof-outlined';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';
import DataRequestTemplateOutlinedIcon from '@/components/icons/data-request-template-outlined';
import HomeOutlinedIcon from '@/components/icons/home-outlined';
import routes from '@/constants/routes';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Home',
    href: routes.dashboardUserHome,
    activeHrefs: [routes.dashboardUserHome],
    icon: HomeOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data assets',
    href: routes.dashboardUserReceivedAssets,
    activeHrefs: [
      routes.dashboardUserReceivedAssets,
      routes.dashboardUserIssuedAssets,
      routes.dashboardUserAsset(''),
    ],
    icon: DataOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data requests',
    href: routes.dashboardUserRequests,
    activeHrefs: [
      routes.dashboardUserRequests,
      routes.dashboardUserRequest(''),
    ],
    icon: DataRequestOutlinedIcon,
    navbar: true,
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
  {
    name: 'Data models',
    href: routes.dashboardUserMyDataModels,
    activeHrefs: [
      routes.dashboardUserMyDataModels,
      routes.dashboardUserNetworkDataModels,
    ],
    icon: DataModelOutlinedIcon,
  },
  {
    name: 'Request templates',
    href: routes.dashboardUserMyRequestTemplates,
    activeHrefs: [
      routes.dashboardUserMyRequestTemplates,
      routes.dashboardUserNetworkRequestTemplates,
    ],
    icon: DataRequestTemplateOutlinedIcon,
  },
];

export default dashboardUserMenuItems;
