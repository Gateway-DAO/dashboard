import DataModelOutlinedIcon from '@/components/icons/data-model-outlined';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import DataProofOutlinedIcon from '@/components/icons/data-proof-outlined';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';
import DataRequestTemplateOutlinedIcon from '@/components/icons/data-request-template-outlined';
import { GTWMenuItemSettings } from '@/components/menu-item/menu-item';
import routes from '@/constants/routes';

import { HomeOutlined } from '@mui/icons-material';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Home',
    href: routes.dashboard.user.home,
    activeHrefs: [routes.dashboard.user.home],
    icon: HomeOutlined,
    navbar: true,
  },
  {
    name: 'Data Assets',
    href: routes.dashboard.user.receivedAssets,
    activeHrefs: [
      routes.dashboard.user.receivedAssets,
      routes.dashboard.user.issuedAssets,
      routes.dashboard.user.issue,
      routes.dashboard.user.issuePda(''),
      routes.dashboard.user.asset(''),
    ],
    icon: DataOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data Requests',
    href: routes.dashboard.user.requests,
    activeHrefs: [
      routes.dashboard.user.requests,
      routes.dashboard.user.request(''),
    ],
    icon: DataRequestOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Data Proofs',
    href: routes.dashboard.user.receivedProofs,
    activeHrefs: [
      routes.dashboard.user.receivedProofs,
      routes.dashboard.user.sentProofs,
      routes.dashboard.user.proof(''),
    ],
    icon: DataProofOutlinedIcon,
  },
  {
    name: 'Data Models',
    href: routes.dashboard.user.myDataModels,
    activeHrefs: [routes.dashboard.user.myDataModels],
    icon: DataModelOutlinedIcon,
  },
  {
    name: 'Request Templates',
    href: routes.dashboard.user.myRequestTemplates,
    activeHrefs: [
      routes.dashboard.user.myRequestTemplates,
      routes.dashboard.user.networkRequestTemplates,
    ],
    icon: DataRequestTemplateOutlinedIcon,
  },
];

export default dashboardUserMenuItems;
