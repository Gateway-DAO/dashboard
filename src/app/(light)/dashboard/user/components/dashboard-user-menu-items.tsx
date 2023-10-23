import { GTWMenuItemSettings } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import DataModelOutlinedIcon from '@/components/icons/data-model-outlined';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import DataProofOutlinedIcon from '@/components/icons/data-proof-outlined';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';
import DataRequestTemplateOutlinedIcon from '@/components/icons/data-request-template-outlined';
import routes from '@/constants/routes';

import { HomeOutlined } from '@mui/icons-material';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Home',
    href: routes.dashboardUserHome,
    activeHrefs: [routes.dashboardUserHome],
    icon: HomeOutlined,
    navbar: true,
  },
  {
    name: 'Data Assets',
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
    name: 'Data Requests',
    href: routes.dashboardUserRequests,
    activeHrefs: [
      routes.dashboardUserRequests,
      routes.dashboardUserRequest(''),
    ],
    icon: DataRequestOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data Proofs',
    href: routes.dashboardUserReceivedProofs,
    activeHrefs: [
      routes.dashboardUserReceivedProofs,
      routes.dashboardUserSentProofs,
      routes.dashboardUserProof(''),
    ],
    icon: DataProofOutlinedIcon,
  },
  {
    name: 'Data Models',
    href: routes.dashboardUserMyDataModels,
    activeHrefs: [routes.dashboardUserMyDataModels],
    icon: DataModelOutlinedIcon,
  },
  {
    name: 'Request Templates',
    href: routes.dashboardUserMyRequestTemplates,
    activeHrefs: [
      routes.dashboardUserMyRequestTemplates,
      routes.dashboardUserNetworkRequestTemplates,
    ],
    icon: DataRequestTemplateOutlinedIcon,
  },
];

export default dashboardUserMenuItems;
