import CodeBlocksOutlinedIcon from '@/components/icons/code-blocks-outlined';
import routes from '@/constants/routes';

import { CodeOutlined, MenuBookOutlined } from '@mui/icons-material';

import { GTWMenuItemSettings } from '../menu-item/menu-item';

export const dashboardDevelopersMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Developer access',
    href: routes.dashboardUserDeveloperAccess,
    activeHrefs: [routes.dashboardUserDeveloperAccess],
    icon: CodeOutlined,
  },
  {
    name: 'Playground',
    href: routes.dashboardUserReceivedProofs,
    activeHrefs: [
      routes.dashboardUserReceivedProofs,
      routes.dashboardUserSentProofs,
      routes.dashboardUserProof(''),
    ],
    icon: CodeBlocksOutlinedIcon,
  },
  {
    name: 'Documentation',
    href: routes.dashboardUserReceivedProofs,
    activeHrefs: [
      routes.dashboardUserReceivedProofs,
      routes.dashboardUserSentProofs,
      routes.dashboardUserProof(''),
    ],
    icon: MenuBookOutlined,
  },
];
