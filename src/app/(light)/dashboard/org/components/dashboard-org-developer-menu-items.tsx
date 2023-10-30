import { GTWMenuItemSettings } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import CodeBlocksOutlinedIcon from '@/components/icons/code-blocks-outlined';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

import { CodeOutlined, MenuBookOutlined } from '@mui/icons-material';

export const dashboardOrgDevelopersMenuItems = (
  username: string
): GTWMenuItemSettings[] => [
  {
    name: 'Developer Access',
    href: routes.dashboard.org.developerAccess(username),
    activeHrefs: [routes.dashboard.org.developerAccess(username)],
    icon: CodeOutlined,
  },
  {
    name: 'Playground',
    href: routes.dashboard.org.playground(username),
    activeHrefs: [routes.dashboard.org.playground(username)],
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

export default dashboardOrgDevelopersMenuItems;
