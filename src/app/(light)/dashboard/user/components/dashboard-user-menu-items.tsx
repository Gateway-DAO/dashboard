import DataModelOutlinedIcon from '@/components/icons/data-model-outlined';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import DataProofOutlinedIcon from '@/components/icons/data-proof-outlined';
import DataRequestOutlinedIcon from '@/components/icons/data-request-outlined';
import DataRequestTemplateOutlinedIcon from '@/components/icons/data-request-template-outlined';
import SharedWithIcon from '@/components/icons/shared-with';
import { GTWMenuItemSettings } from '@/components/menu-item/menu-item';
import routes from '@/constants/routes';
import { isSandbox } from '@/utils/env';

import {
  ExploreOutlined,
  HistoryOutlined,
  HomeOutlined,
  Inventory2Outlined,
} from '@mui/icons-material';

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
    name: 'My Data',
    href: routes.dashboard.user.myAssets,
    activeHrefs: [
      routes.dashboard.user.myAssets,
      routes.dashboard.user.issue,
      routes.dashboard.user.issuePda(''),
      routes.dashboard.user.asset(''),
    ],
    icon: DataOutlinedIcon,
    navbar: true,
  },
  {
    name: 'Shared with me',
    href: routes.dashboard.user.requests,
    activeHrefs: [
      routes.dashboard.user.requests,
      routes.dashboard.user.request(''),
    ],
    icon: SharedWithIcon,
    navbar: true,
  },
  {
    name: 'Archived data',
    href: routes.dashboard.user.requests,
    activeHrefs: [
      routes.dashboard.user.requests,
      routes.dashboard.user.request(''),
    ],
    icon: Inventory2Outlined,
    navbar: true,
  },
  {
    name: 'Activity',
    href: routes.dashboard.user.requests,
    activeHrefs: [
      routes.dashboard.user.requests,
      routes.dashboard.user.request(''),
    ],
    icon: HistoryOutlined,
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
    hide: !isSandbox,
  },
  {
    name: 'Shared Data',
    href: routes.dashboard.user.receivedProofs,
    activeHrefs: [
      routes.dashboard.user.receivedProofs,
      routes.dashboard.user.sentProofs,
      routes.dashboard.user.proof(''),
    ],
    icon: DataProofOutlinedIcon,
    hide: !isSandbox,
  },
  {
    name: 'Data Models',
    href: routes.dashboard.user.myDataModels,
    activeHrefs: [routes.dashboard.user.myDataModels],
    icon: DataModelOutlinedIcon,
    hide: !isSandbox,
  },
  {
    name: 'Request Templates',
    href: routes.dashboard.user.myRequestTemplates,
    activeHrefs: [
      routes.dashboard.user.myRequestTemplates,
      routes.dashboard.user.networkRequestTemplates,
    ],
    icon: DataRequestTemplateOutlinedIcon,
    hide: !isSandbox,
  },
  {
    name: 'Explorer',
    href: routes.explorer.root,
    activeHrefs: [],
    icon: ExploreOutlined,
    externalLink: true,
  },
].filter((item) => !item.hide);

export default dashboardUserMenuItems;
