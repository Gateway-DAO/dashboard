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
export const dashboardOrgMenuItems = (
  username: string
): GTWMenuItemSettings[] => [
  {
    name: 'Home',
    href: routes.dashboardOrgHome(username),
    activeHrefs: [routes.dashboardOrgHome(username)],
    icon: HomeOutlined,
    navbar: true,
  },
  {
    name: 'Issuances',
    href: routes.dashboardOrgIssuedAssets(username),
    activeHrefs: [routes.dashboardOrgIssuedAssets(username)],
    icon: DataOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data Requests',
    href: routes.dashboardOrgRequests(username),
    activeHrefs: [routes.dashboardOrgRequests(username)],
    icon: DataRequestOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Received Data Proofs',
    href: routes.dashboardOrgReceivedProofs(username),
    activeHrefs: [routes.dashboardOrgReceivedProofs(username)],
    icon: DataProofOutlinedIcon,
  },
  {
    name: 'Data Models',
    href: routes.dashboardOrgMyDataModels(username),
    activeHrefs: [
      routes.dashboardOrgMyDataModels(username),
      routes.dashboardOrgNetworkDataModels(username),
    ],
    icon: DataModelOutlinedIcon,
  },
  {

    name: 'Request Templates',
    href: routes.dashboardOrgMyRequestTemplates(username),
    activeHrefs: [
      routes.dashboardOrgMyRequestTemplates(username),
      routes.dashboardOrgNetworkRequestTemplates(username),
    ],

    icon: DataRequestTemplateOutlinedIcon,
  },
];

export default dashboardOrgMenuItems;
