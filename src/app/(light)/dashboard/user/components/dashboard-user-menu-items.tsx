import DataOutlinedIcon from '@/components/icons/data-outlined';
import SharedWithIcon from '@/components/icons/shared-with';
import { GTWMenuItemSettings } from '@/components/menu-item/menu-item';
import routes from '@/constants/routes';

import { ExploreOutlined, HistoryOutlined } from '@mui/icons-material';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemSettings[] = [
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
    href: routes.dashboard.user.shared,
    activeHrefs: [
      routes.dashboard.user.shared,
      routes.dashboard.user.sharedData(''),
    ],
    icon: SharedWithIcon,
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
    name: 'Explorer',
    href: routes.explorer.root,
    activeHrefs: [],
    icon: ExploreOutlined,
    externalLink: true,
  },
];

export default dashboardUserMenuItems;
