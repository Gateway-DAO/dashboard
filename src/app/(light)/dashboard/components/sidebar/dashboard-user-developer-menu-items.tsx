import CodeBlocksOutlinedIcon from '@/components/icons/code-blocks-outlined';
import documentationRoutes from '@/constants/documentationRoutes';
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
    href: routes.dashboardUserPlayground,
    activeHrefs: [routes.dashboardUserPlayground],
    icon: CodeBlocksOutlinedIcon,
  },
  {
    name: 'Documentation',
    href: documentationRoutes.home,
    activeHrefs: [],
    icon: MenuBookOutlined,
    externalLink: true,
  },
];
