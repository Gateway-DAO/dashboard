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
export const dashboardOrgMenuItems = (
  username: string
): GTWMenuItemSettings[] => [
  {
    name: 'Home',
    href: routes.dashboardOrgHome(username),
    activeHrefs: [routes.dashboardOrgHome(username)],
    icon: HomeOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Issued data assets',
    href: routes.dashboardOrgIssuedAssets(username),
    activeHrefs: [routes.dashboardOrgIssuedAssets(username)],
    icon: DataOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data requests',
    href: routes.dashboardOrgRequests(username),
    activeHrefs: [routes.dashboardOrgRequests(username)],
    icon: DataRequestOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Received data proofs',
    href: routes.dashboardOrgReceivedProofs(username),
    activeHrefs: [routes.dashboardOrgReceivedProofs(username)],
    icon: DataProofOutlinedIcon,
  },
  {
    name: 'Data models',
    href: routes.dashboardOrgMyDataModels(username),
    activeHrefs: [
      routes.dashboardOrgMyDataModels(username),
      routes.dashboardOrgNetworkDataModels(username),
    ],
    icon: DataModelOutlinedIcon,
  },
  {
    name: 'Request templates',
    href: routes.dashboardOrgMyRequestTemplates(username),
    activeHrefs: [
      routes.dashboardOrgMyRequestTemplates(username),
      routes.dashboardOrgNetworkRequestTemplates(username),
    ],
    icon: DataRequestTemplateOutlinedIcon,
  },
];

export default dashboardOrgMenuItems;
