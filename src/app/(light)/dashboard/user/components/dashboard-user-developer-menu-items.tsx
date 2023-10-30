import CodeBlocksOutlinedIcon from '@/components/icons/code-blocks-outlined';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

import { CodeOutlined, MenuBookOutlined } from '@mui/icons-material';

import { GTWMenuItemSettings } from '../../components/menu-item/menu-item';

export const dashboardDevelopersMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Developer Access',
    href: routes.dashboard.user.developerAccess,
    activeHrefs: [routes.dashboard.user.developerAccess],
    icon: CodeOutlined,
  },
  {
    name: 'Playground',
    href: routes.dashboard.user.playground,
    activeHrefs: [routes.dashboard.user.playground],
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
