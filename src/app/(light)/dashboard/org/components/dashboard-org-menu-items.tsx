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
    href: routes.dashboard.org.home(username),
    activeHrefs: [routes.dashboard.org.home(username)],
    icon: HomeOutlined,
    navbar: true,
  },
  {
    name: 'Issuances',
    href: routes.dashboard.org.issuedAssets(username),
    activeHrefs: [routes.dashboard.org.issuedAssets(username)],
    icon: DataOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data Requests',
    href: routes.dashboard.org.requests(username),
    activeHrefs: [routes.dashboard.org.requests(username)],
    icon: DataRequestOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Received Data Proofs',
    href: routes.dashboard.org.receivedProofs(username),
    activeHrefs: [routes.dashboard.org.receivedProofs(username)],
    icon: DataProofOutlinedIcon,
  },
  {
    name: 'Data Models',
    href: routes.dashboard.org.myDataModels(username),
    activeHrefs: [
      routes.dashboard.org.myDataModels(username),
      routes.dashboard.org.networkDataModels(username),
    ],
    icon: DataModelOutlinedIcon,
  },
  {
    name: 'Request Templates',
    href: routes.dashboard.org.myRequestTemplates(username),
    activeHrefs: [
      routes.dashboard.org.myRequestTemplates(username),
      routes.dashboard.org.networkRequestTemplates(username),
    ],

    icon: DataRequestTemplateOutlinedIcon,
  },
];

export default dashboardOrgMenuItems;
