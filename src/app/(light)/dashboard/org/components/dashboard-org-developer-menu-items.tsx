import { GTWMenuItemSettings } from '@/app/(light)/dashboard/components/menu-item/menu-item';
import CodeBlocksOutlinedIcon from '@/components/icons/code-blocks-outlined';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

import { CodeOutlined, MenuBookOutlined } from '@mui/icons-material';

export const dashboardOrgDevelopersMenuItems = (
  username: string
): GTWMenuItemSettings[] => [
  {
    name: 'Developer access',
    href: routes.dashboardOrgDeveloperAccess(username),
    activeHrefs: [routes.dashboardOrgDeveloperAccess(username)],
    icon: CodeOutlined,
    hamburger: true,
  },
  {
    name: 'Playground',
    href: routes.dashboardOrgPlayground(username),
    activeHrefs: [routes.dashboardOrgPlayground(username)],
    icon: CodeBlocksOutlinedIcon,
    hamburger: true,
  },
  {
    name: 'Documentation',
    href: documentationRoutes.home,
    activeHrefs: [],
    icon: MenuBookOutlined,
    externalLink: true,
    hamburger: true,
  },
];

export default dashboardOrgDevelopersMenuItems;
