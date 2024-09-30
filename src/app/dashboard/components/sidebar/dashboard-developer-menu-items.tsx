import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

import {
  CodeOutlined,
  ExploreOutlined,
  MenuBookOutlined,
} from '@mui/icons-material';

import { GTWMenuItemSettings } from '../menu-item';

export const dashboardDevelopersMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'API',
    href: routes.dashboard.developerAccess,
    activeHrefs: [routes.dashboard.developerAccess],
    icon: CodeOutlined,
  },
  {
    name: 'Documentation',
    href: documentationRoutes.home,
    activeHrefs: [],
    icon: MenuBookOutlined,
    externalLink: true,
  },
  {
    name: 'Explorer',
    href: routes.explorer.home,
    activeHrefs: [],
    icon: ExploreOutlined,
    externalLink: true,
  },
];
